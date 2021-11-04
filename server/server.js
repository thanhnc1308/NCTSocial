const io = require('socket.io')(5000, {
    cors: {
        origin: '*'
    }
});

io.on('connection', socket => {
    const id = socket.handshake.query.id;
    // console.log(socket.handshake.query)
    socket.join(id);

    socket.on('send-message', ({ recipients, text }) => {
        // console.log(`send-message: ${id} - ${recipients} - ${text}`);
        recipients.forEach(recipient => {
            const newRecipients = recipients.filter(r => r !== recipient);
            newRecipients.push(id);
            // console.log(`receive-message: ${newRecipients} - ${id}`);
            // console.log(`receive-message: ${newRecipients} - ${text}`);
            socket.broadcast.to(recipient).emit('receive-message', {
                recipients: newRecipients,
                sender: id,
                text
            })
        })
    })
})
