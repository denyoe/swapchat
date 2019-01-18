"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bookshelf = require('../../bookshelf');
exports.User = bookshelf.model('User', {
    tableName: 'users',
    posts: function () {
        return this.hasMany('Post');
    },
    channels: function () {
        return this.belongsToMany('Channel', 'user_channels');
    },
    owned_channels: function () {
        return this.hasMany('Channel');
    }
});
// module.exports = bookshelf.model('User', User)
// export default class User extends bookshelf.Model {
//     get tableName() {
//         return 'users'
//     }
//     get hasTimestamps() {
//         return false
//     }
//     posts() {
//         return this.hasMany(Post)
//     }
//     verifyPassword(password: string) {
//         return this.get('password') === password
//     }
//     static byEmail(username: string) {
//         return this.forge().query({ where: { username: username } }).fetch()
//     }
// }
