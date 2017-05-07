const expect = require('expect');

var { generateMessage, generateLocationMessage } = require('./message');

describe('generateMessage', () => {
    it('should generate correct message object', () => {
        var from = 'John';
        var text = 'Hey!!';

        var message = generateMessage(from, text);
        
        expect(message.createdAt).toBeA('number');
        expect(message).toInclude({from, text});
    });
});

describe('generateLocationMessage', () => {
    it('should generate correct location message object', () => {
        var from = 'John';
        var lat = '14.5812966';
        var lng = '121.0095183';
        var url = `https://www.google.com/maps?q=${lat},${lng}`;

        var message = generateLocationMessage(from, lat, lng);

        expect(message.createdAt).toBeA('number');
        expect(message).toInclude({from, url});
    });
});