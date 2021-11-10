const router = require('express').Router()
const Conversation = require('../models/Conversation');
const Log = require('../utils/Log');
const User = require('../models/User');

/**
 * Create a new conversation
 */
router.post('/', async (req, res) => {
    try {
        const newConversation = new Conversation({
            members: req.body
        })
        const savedConversation = await newConversation.save();
        return res.status(200).json(savedConversation);
    } catch (e) {
        Log.exception(e);
        return res.status(500).json(e);
    }
})

/**
 * Get all conversations of a user
 */
router.get('/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const conversations = await Conversation.find({
            members: { $in: [userId]}
        })
        const currentUser = await User.findById(userId);
        const currentUserView = {
            _id: currentUser._id,
            username: currentUser.username,
            profilePicture: currentUser.profilePicture
        }
        for (let conversation of conversations) {
            const members = [];
            for (let member of conversation.members) {
                if (member === userId) {
                    members.push(currentUserView);
                } else {
                    const user = await User.findById(member);
                    members.push({
                        _id: user._id,
                        username: user.username,
                        profilePicture: user.profilePicture
                    })
                }
            }
            conversation.members = members;
        }
        res.status(200).json(conversations);
    } catch (e) {
        Log.exception(e);
        res.status(500).json(e);
    }
})

module.exports = router;
