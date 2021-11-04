const router = require('express').Router();
const User = require('../models/User');
const Log = require('../utils/Log');
const bcrypt = require('bcrypt');

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

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            res.status(404).json('User not found');
        }

        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            res.status(400).json('Wrong password');
        }

        res.status(200).json(user);
    } catch (e) {
        Log.exception(e);
        res.status(500).json(e);
    }
})

module.exports = router;
