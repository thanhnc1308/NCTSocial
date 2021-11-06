const router = require("express").Router();
const Post = require("../models/Post");
const User = require("../models/User");
const Log = require('../utils/Log');

router.post("/", async (req, res) => {
    try {
        const newPost = new Post(req.body);
        const savedPost = await newPost.save();
        res.status(200).json(savedPost);
    } catch (e) {
        Log.exception(e);
        res.status(500).json(e);
    }
});

router.put("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post.userId === req.body.userId) {
            await post.updateOne({ $set: req.body });
            res.status(200).json("the post has been updated");
        } else {
            res.status(403).json("you can update only your post");
        }
    } catch (e) {
        Log.exception(e);
        res.status(500).json(e);
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post.userId === req.body.userId) {
            await post.deleteOne();
            res.status(200).json("the post has been deleted");
        } else {
            res.status(403).json("you can delete only your post");
        }
    } catch (e) {
        Log.exception(e);
        res.status(500).json(e);
    }
});

router.put("/:id/like", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post.likes.includes(req.body.userId)) {
            await post.updateOne({ $push: { likes: req.body.userId } });
            res.status(200).json("The post has been liked");
        } else {
            await post.updateOne({ $pull: { likes: req.body.userId } });
            res.status(200).json("The post has been disliked");
        }
    } catch (e) {
        Log.exception(e);
        res.status(500).json(e);
    }
});

/**
 * Get a post
 */
router.get("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        res.status(200).json(post);
    } catch (e) {
        Log.exception(e);
        res.status(500).json(e);
    }
});

/**
 * Get timeline posts
 */
router.get("/timeline/:userId", async (req, res) => {
    try {
        const currentUser = await User.findById(req.params.userId);
        const userPosts = await Post.find({ userId: currentUser._id });
        const friendPosts = await Promise.all(
        currentUser.followings.map((friendId) => {
            return Post.find({ userId: friendId });
        })
        );
        res.status(200).json(userPosts.concat(...friendPosts));
    } catch (e) {
        Log.exception(e);
        res.status(500).json(e);
    }
});

/**
 * Get timeline posts
 */
router.get("/", async (req, res) => {
    try {
        console.log('1');
        const posts = await Post.find({});
        console.log(posts);
        res.status(200).json(posts);
    } catch (e) {
        Log.exception(e);
        res.status(500).json(e);
    }
});

/**
 * Get user's all posts
 */
router.get("/profile/:username", async (req, res) => {
    try {
        const user = await User.findOne({ username: req.params.username });
        const posts = await Post.find({ userId: user._id });
        res.status(200).json(posts);
    } catch (e) {
        Log.exception(e);
        res.status(500).json(e);
    }
});


module.exports = router;
