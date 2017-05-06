const path = require('path');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New user connected');

    socket.emit('newEmail', {
        from: 'mike@example.com',
        text: 'Hey, What is going on.',
        createAt: 123
    });

    socket.on('createEmail', (newEmail) => {
        console.log('createdEmail', newEmail);
    });

    socket.emit('newMessage', {
        from: 'andrew',
        text: 'Hey! can we meet up at 6',
        createdAt: new Date().getTime()
    });

    socket.on('createMessage', (newMessage) => {
        console.log('createdMessage', newMessage);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

server.listen(port, () => {
    console.log(`App is listening to ${port}`);
});