"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var bookshelf = require('../../bookshelf');
var User_1 = __importDefault(require("./User"));
var Channel_1 = __importDefault(require("./Channel"));
exports.default = bookshelf.Model.extend({
    tableName: 'messages',
    author: function () {
        return this.belongsTo(User_1.default);
    },
    channel: function () {
        return this.belongsTo(Channel_1.default);
    }
});
