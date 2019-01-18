"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bookshelf = require('../../bookshelf');
exports.Post = bookshelf.model('Post', {
    tableName: 'messages',
    author: function () {
        return this.belongsTo('User');
    },
    channel: function () {
        return this.belongsTo('Channel');
    }
});
