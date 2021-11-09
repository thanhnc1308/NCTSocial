const router = require('express').Router()
const Conversation = require('../models/Conversation');
const Log = require('../utils/Log');

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
        const conversations = await Conversation.find({
            members: { $in: [req.params.userId]}
        })
        res.status(200).json(conversations);
    } catch (e) {
        Log.exception(e);
        res.status(500).json(e);
    }
})

module.exports = router;
