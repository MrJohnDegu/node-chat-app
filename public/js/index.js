var socket = io();

socket.on('connect', function () {
    console.log('Connected to server');
});

socket.on('disconnect', function () {
    console.log('Disconnected from server');
});

socket.on('newMessage', function (message) {
    var formattedTime = moment(message.createdAt).format('h:mm a');
    var li = $('<li></li>');

    li.text(`${message.from} ${formattedTime}: ${message.text}`);

    $('#messages').append(li);
});

socket.on('newLocationMessage', function (message) {
    var formattedTime = moment(message.createdAt).format('h:mm a');
    var li = $('<li></li>');
    var a = $('<a target="_blank">My current location</a>');

    li.text(`${message.from} ${formattedTime}: `);
    a.attr('href', message.url);
    li.append(a);

    $('#messages').append(li);
});

$('#message-form').submit(function(e) {
    e.preventDefault();

    var $messageTextbox = $('[name=message]');

    if ($messageTextbox.val().trim() != '') {
        socket.emit('createMessage', {
            from: 'User',
            text: $messageTextbox.val()
        }, function() {
            $messageTextbox.val('');
        });
    }
});

var $sendLocation = $('#send-location');

$sendLocation.on('click', function(e){
    if (!navigator.geolocation) {
        return alert('Geolocation not supported by your browser.');
    }

    $sendLocation.attr('disabled','disabled').text('Sending location...');

    navigator.geolocation.getCurrentPosition(function(position){
        $sendLocation.removeAttr('disabled').text('Send location');
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    }, function(err){
        $sendLocation.removeAttr('disabled').text('Send location');
        alert('Unable to fetch location.');
    })
});
