const router = require('express').Router();
const User = require('../models/User');
const Log = require('../utils/Log');
const bcrypt = require('bcrypt');
const { verifyTokenAndAdmin } = require('../utils/verifyToken');

router.get('/', async (req, res) => {
    try {
        const allUsers = await User.find({});
        // const allUsers = await User.find().sort({ _id: -1 }).limit(5)
        res.status(200).json(allUsers);
    } catch (e) {
        Log.exception(e);
        res.status(500).json(e);
    }
})

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        const { password, ...other } = user._doc;
        res.status(200).json(other);
    } catch (e) {
        Log.exception(e);
        res.status(500).json(e);
    }
})

router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(password, salt);
        const user = await User.findByIdAndUpdate(id, {
            $set: req.body
        }, { new: true } ) // set new to true to return the updated User
        res.status(200).json(user);
    } catch (e) {
        Log.exception(e);
        res.status(500).json(e);
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await User.findByIdAndDelete(id);
        res.status(200).json(id);
    } catch (e) {
        Log.exception(e);
        res.status(500).json(e);
    }
})

/**
 * Get user stats
 */
router.get("/stats", verifyTokenAndAdmin, async (req, res) => {
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

    try {
        const data = await User.aggregate([
        { $match: { createdAt: { $gte: lastYear } } },
        {
            $project: {
            month: { $month: "$createdAt" },
            },
        },
        {
            $group: {
            _id: "$month",
            total: { $sum: 1 },
            },
        },
        ]);
        res.status(200).json(data)
    } catch (err) {
        res.status(500).json(err);
    }
});

/**
 * Get friends
 */
router.get("/:userId/friends", async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        const friends = await Promise.all(
            user.followings.map((friendId) => {
                return User.findById(friendId);
            })
        );
        let friendList = [];
        friends.map((friend) => {
            const { _id, username, profilePicture } = friend;
            friendList.push({ _id, username, profilePicture });
        });
        res.status(200).json(friendList)
    } catch (e) {
        Log.exception(e);
        res.status(500).json(e);
    }
});

/**
 * Follow a user
 */
router.put('/:id/follow', async (req, res) => {
    try {
        const { id } = req.params;
        const { followedUserId } = req.body;
        const currentUser = await User.findById(id);
        const followedUser = await User.findById(followedUserId);
        if (!followedUser.followers.includes(id)) {
            await followedUser.updateOne({
                $push: {
                    followers: id
                }
            })
            await currentUser.updateOne({
                $push: {
                    followings: followedUserId
                }
            })
            res.status(200).json('Success');
        } else {
            res.status(403).json('You already followed this user');
        }
    } catch (e) {
        Log.exception(e);
        res.status(500).json(e);
    }
})

/**
 * Unfollow a user
 */
router.put('/:id/unfollow', async (req, res) => {
    try {
        const { id } = req.params;
        const { followedUserId } = req.body;
        const currentUser = await User.findById(id);
        const followedUser = await User.findById(followedUserId);
        if (!followedUser.followers.includes(id)) {
            await followedUser.updateOne({
                $pull: {
                    followers: id
                }
            })
            await currentUser.updateOne({
                $pull: {
                    followings: followedUserId
                }
            })
            res.status(200).json('Success');
        } else {
            res.status(403).json('You already followed this user');
        }
    } catch (e) {
        Log.exception(e);
        res.status(500).json(e);
    }
})

module.exports = router;
