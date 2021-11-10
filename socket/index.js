const io = require('socket.io')(8900, {
    cors: {
        origin: 'http://localhost:3000' // client url
    }
})

let users = [];

const addUser = (userId, socketId) => {
    !users.some(user => user._id === userId)
        &&
    users.push({
        userId,
        socketId
    })
}

const removeUser = (socketId) => {
    users = users.filter(user => user.socketId !== socketId);
}

const getUser = userId => users.find(user => user.userId === userId);

io.on('connection', (socket) => {
    console.log('An user connected');

    // take userId and socketId from the client
    socket.on('addUser', userId => {
        addUser(userId, socket.id);
        io.emit('getUsers', users);
    })

    // send and get message
    socket.on('sendMessage', ({ senderId, receiverId, text}) => {
        const user = getUser(receiverId);
        if (user) {
            io.to(user.socketId).emit('getMessage', {
                senderId,
                text
            })
        }
    })

    // remove user if disconnected
    socket.on('disconnect', () => {
        removeUser(socket.id);
        io.emit('getUsers', users);
    })
})
