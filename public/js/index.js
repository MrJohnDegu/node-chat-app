var socket = io();

function scrollToBottom() {
    // Selectors
    var $messages =  $('#messages');
    var $newMessage = $messages.children('li:last-child');
    // Heights
    var clientHeight = $messages.prop('clientHeight');
    var scrollTop = $messages.prop('scrollTop');
    var scrollHeight = $messages.prop('scrollHeight');
    var newMessageHeight = $newMessage.innerHeight();
    var lastMessageHeight = $newMessage.prev().innerHeight();

    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        $messages.scrollTop(scrollHeight);
        // alert('Should scroll to the bottom');
    } else {

    }
}

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
    scrollToBottom();
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
    scrollToBottom();
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
