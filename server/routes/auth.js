const router = require('express').Router();
const User = require('../models/User');
const Log = require('../utils/Log');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { verifyToken } = require('../utils/verifyToken');

router.post('/register', async (req, res) => {
    try {
        // create new user
        const { username, email, password } = req.body;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new User({
            username,
            email,
            password: hashedPassword
        })

        // save user
        const user = await newUser.save();
        res.status(200).json(user);
    } catch (e) {
        Log.exception(e);
        res.status(500).json(e);
    }
})

// TODO: save refresh token in database or cache
const refreshTokens = [];

const generateAccessToken = (user) => {
    return jwt.sign(
        {
            id: user._id
        },
        process.env.JWT_SECRET_KEY,
        {
            expiresIn: '30m'
        }
    )
}

const generateRefreshToken = (user) => {
    return jwt.sign(
        {
            id: user._id
        },
        process.env.JWT_SECRET_KEY
    )
}

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            res.status(404).json('User not found');
        }

        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            res.status(400).json('Wrong username or password');
        }

        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);
        // save refresh token
        refreshTokens.push(refreshToken);

        res.status(200).json({
            success: true,
            data: {
                username: user.username,
                userId: user._id,
                profilePicture: user.profilePicture,
                followers: user.followers,
                followings: user.followings,
                accessToken,
                refreshToken
            }
        });
    } catch (e) {
        Log.exception(e);
        res.status(500).json({
            sucess: false,
            data: e
        });
    }
})

router.post('/refresh', (req, res) => {
    try {
        const { refreshToken } = req.body;
        if (!refreshToken) {
            return res.status(401).json('You are not authenticated!');
        }

        if (!refreshTokens.includes(refreshToken)) {
            return res.status(403).json('Refresh token is not valid!')
        }

        jwt.verify(
            refreshToken,
            process.env.JWT_SECRET_KEY,
            (err, user) => {
                if (err) {
                    return res.status(400).json(err);
                }

                // remove old refresh token
                refreshTokens = refreshTokens.filter(token => token !== refreshToken);

                const newAccessToken = generateAccessToken(user);
                const newRefreshToken = generateRefreshToken(user);
                refreshTokens.push(newRefreshToken);

                return res.status(200).json({
                    accessToken: newAccessToken,
                    refreshToken: newRefreshToken
                })
            }
        )
    } catch (e) {
        Log.exception(e);
        res.status(500).json(e);
    }
})

router.post('/logout', verifyToken, (req, res) => {
    const { refreshToken } = req.body;
    // remove refreshToken
    refreshTokens = refreshTokens.filter(token => token !== refreshToken);
    res.status(200).json('You logged out successfully');
})

module.exports = router;
