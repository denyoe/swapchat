"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var bookshelf = require('../../bookshelf');
var Post_1 = __importDefault(require("./Post"));
exports.default = bookshelf.Model.extend({
    tableName: 'users',
    posts: function () {
        return this.hasMany(Post_1.default);
    }
});
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
