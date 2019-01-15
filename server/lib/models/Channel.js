"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var bookshelf = require('../../bookshelf');
var Post_1 = __importDefault(require("./Post"));
exports.default = bookshelf.Model.extend({
    tableName: 'channels',
    posts: function () {
        return this.hasMany(Post_1.default);
    }
});
