"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bookshelf = require('../../bookshelf');
// export default bookshelf.Model.extend({
//     tableName: 'messages',
//     author: function(): Object {
//         return this.belongsTo(User)
//     },
//     channel: function(): Object {
//         return this.belongsTo(Channel)
//     }
// })
module.exports = bookshelf.model('Post', {
    tableName: 'messages',
    author: function () {
        return this.belongsTo('User');
    },
    channel: function () {
        return this.belongsTo('Channel');
    }
});
