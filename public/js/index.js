var socket = io();

socket.on('connect', function () {
    console.log('Connected to server');

    socket.emit('createEmail', {
        to: 'jen@example.com',
        text: 'Hey, this is Andrew.'
    });

    socket.emit('createMessage', {
        from: 'John',
        text: 'Sure!!!'
    });
});

socket.on('disconnect', function () {
    console.log('Disconnected from server');
});

socket.on('newEmail', function (email) {
    console.log(email);
});

socket.on('newMessage', function (message) {
    console.log(message);
});