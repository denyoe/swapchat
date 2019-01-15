"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var User_1 = __importDefault(require("../models/User"));
exports.all = function (req, res, next) {
    User_1.default.fetchAll().then(function (users) {
        return res.json(users);
    }).catch(function (err) {
        return res.json({
            status: 'error',
            msg: err,
            data: []
        });
    });
};
exports.create = function (req, res, next) {
    var user = {
        'username': req.body.username,
        'password': req.body.password
    };
    new User_1.default(user)
        .save()
        .then(function (user) {
        return res.json(user);
    });
};
exports.get = function (req, res, next) {
    User_1.default.where('id', req.params.id).fetch().then(function (user) {
        res.json(user);
    }).catch(function (err) {
        return res.json({
            status: 'error',
            msg: err,
            data: []
        });
    });
};
exports.update = function (req, res, next) {
    //
};
exports.remove = function (req, res, next) {
    new User_1.default({ id: req.params.id })
        .destroy()
        .then(function (model) {
        res.json({
            status: 'success',
            msg: 'Record Successfully Delated',
            data: model
        });
    });
};
exports.posts = function (req, res, next) {
    new User_1.default({ id: req.params.id })
        .fetch({ withRelated: ['posts'] })
        .then(function (model) {
        res.json(model);
    });
};
