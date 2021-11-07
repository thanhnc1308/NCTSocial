const router = require('express').Router();
const User = require('../models/User');
const Log = require('../utils/Log');
const bcrypt = require('bcrypt');
const Post = require("../models/Post");

router.get('/clear', async (req, res) => {
    try {
        User.deleteMany({}, () => Log.info('Clear collection User'));
        Post.deleteMany({}, () => Log.info('Clear collection Post'));
        res.status(200).json('ok');
    } catch (e) {
        Log.exception(e);
        res.status(500).json(e);
    }
})

router.get('/generate', async (req, res) => {
    try {

        // generate user
        const users = [];
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash('123456', salt);
        for (let i = 1; i <= 10; ++i) {
            const newUser = new User({
                username: `ncthanh${i}`,
                email: `ncthanh${i}@gmail.com`,
                profilePicture: `/person/${i}.jpeg`,
                password: hashedPassword
            })
            const user = await newUser.save();
            users.push(user);
        }

        // generate posts
        for (let user of users) {
            for (let i = 1; i <= 10; ++i) {
                const newPost = new Post({
                    userId: user._id,
                    desc: `This is a description of post ${i} of ${user.username}`,
                    photo: `/post/${i}.jpeg`
                })
                await newPost.save();
            }
        }

        res.status(200).json('ok');
    } catch (e) {
        Log.exception(e);
        res.status(500).json(e);
    }
})

module.exports = router;