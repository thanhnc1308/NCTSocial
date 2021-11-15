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
                profilePicture: `person/${i}.jpeg`,
                password: hashedPassword,
                desc: `desc of user ncthanh${i}`
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
                    photo: `post/${i}.jpeg`
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

/**
 * Find with condition $in for Array-typed properties
 */
router.get("/", async (req, res) => {
    const qNew = req.query.new;
    const qCategory = req.query.category;
    try {
        let products;

        if (qNew) {
        products = await Product.find().sort({ createdAt: -1 }).limit(1);
        } else if (qCategory) {
        products = await Product.find({
            categories: {
            $in: [qCategory],
            },
        });
        } else {
        products = await Product.find();
        }

        res.status(200).json(products);
    } catch (err) {
        res.status(500).json(err);
    }
});

/**
 * Find one by some conditions
 */
// router.get("/find/:userId", verifyTokenAndAuthorization, async (req, res) => {
//     try {
//         const cart = await Cart.findOne({ userId: req.params.userId });
//         res.status(200).json(cart);
//     } catch (err) {
//         res.status(500).json(err);
//     }
// });

/**
 * Find with aggregate
 */
// router.get("/income", verifyTokenAndAdmin, async (req, res) => {
//     const productId = req.query.pid;
//     const date = new Date();
//     const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
//     const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

//     try {
//         const income = await Order.aggregate([
//         {
//             $match: {
//             createdAt: { $gte: previousMonth },
//             ...(productId && {
//                 products: { $elemMatch: { productId } },
//             }),
//             },
//         },
//         {
//             $project: {
//             month: { $month: "$createdAt" },
//             sales: "$amount",
//             },
//         },
//         {
//             $group: {
//             _id: "$month",
//             total: { $sum: "$sales" },
//             },
//         },
//         ]);
//         res.status(200).json(income);
//     } catch (err) {
//         res.status(500).json(err);
//     }
// });

module.exports = router;