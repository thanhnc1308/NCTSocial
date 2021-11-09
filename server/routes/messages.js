const router = require('express').Router()
const Message = require('../models/Message');
const Log = require('../utils/Log');

/**
 * Create a new message
 */
router.post('/', async (req, res) => {
    try {
        const newMessage = new Message(req.body)
        await newMessage.save();
        return res.status(200).json(newMessage);
    } catch (e) {
        Log.exception(e);
        return res.status(500).json(e);
    }
})

/**
 * Get messages of a conversatons
 */
router.get('/:conversationId', async (req, res) => {
    try {
        const messages = await Message.find({
            conversationId: req.params.conversationId
        })
        return res.status(200).json(messages);
    } catch (e) {
        Log.exception(e);
        return res.status(500).json(e);
    }
})

module.exports = router;