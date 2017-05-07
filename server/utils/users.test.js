const expect = require('expect');
const { Users } = require('./users');

describe('Users', () => {
    var users;

    beforeEach(() => {
        users = new Users();
        users.users = [{
            id: '1',
            name: 'Mike',
            room: 'Node Course'
        },{
            id: '2',
            name: 'Jen',
            room: 'React Course'
        },{
            id: '3',
            name: 'Julie',
            room: 'Node Course'
        }]
    });

    it('should add new user', () => {
         var users = new Users();
         var user = {
             id: '123',
             name: 'John',
             room: 'The Office Fans'
         };
         var resUser = users.addUser(user.id, user.name, user.room);

         expect(users.users).toEqual([user]);
    });

    it('should remove a user', () =>{
        var userId = '3';
        var resUser = users.removeUser(userId);

        expect(resUser.id).toBe(userId);
        expect(users.users.length).toBe(2);
    });

    it('should not remove user', () => {
        var userId = '2';
        var resUsers = users.removeUser('5');

        expect(resUsers).toNotExist();
        expect(users.users.length).toBe(3);
    });

    it('should find a user', () => {
        var resUser = users.getUser('1');
        expect(resUser).toInclude(users.users[0]);
    });

    it('should not find a user', () => {
        var resUser = users.getUser('5');
        expect(resUser).toNotExist();
    });

    it('should return names for Node Course', () => {
        var userList = users.getUserList('Node Course');
        expect(userList).toEqual(['Mike', 'Julie']);
    });

    it('should return names for React Course', () => {
        var userList = users.getUserList('React Course');
        expect(userList).toEqual(['Jen']);
    });
});