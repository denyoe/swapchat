"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bookshelf = require('../../bookshelf');
exports.Subscription = bookshelf.model('Subscription', {
    tableName: 'user_channels',
});
