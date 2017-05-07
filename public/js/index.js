var socket = io();

socket.on('connect', function () {
    console.log('Connected to server');
});

socket.on('disconnect', function () {
    console.log('Disconnected from server');
});

socket.on('newMessage', function (message) {
    var formattedTime = moment(message.createdAt).format('h:mm a');
    var template = $('#message-template').html();
    var html = Mustache.render(template,{
        from: message.from,
        text: message.text,
        createdAt: formattedTime
    });

    $('#messages').append(html);
});

socket.on('newLocationMessage', function (message) {
    var formattedTime = moment(message.createdAt).format('h:mm a');
    var template = $('#location-message-template').html();
    var html = Mustache.render(template,{
        from: message.from,
        url: message.url,
        createdAt: formattedTime
    });

    $('#messages').append(html);
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
