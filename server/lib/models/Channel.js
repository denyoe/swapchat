"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bookshelf = require('../../bookshelf');
exports.Channel = bookshelf.model('Channel', {
    tableName: 'channels',
    posts: function () {
        return this.hasMany('Post');
    },
    members: function () {
        return this.belongsToMany('User', 'user_channels');
    },
    owner: function () {
        return this.belongsTo('User');
    }
});
