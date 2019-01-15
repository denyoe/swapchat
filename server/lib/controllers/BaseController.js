"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Bookshelf = require('../../bookshelf');
var BaseController = /** @class */ (function () {
    function BaseController(theModel) {
        var _this = this;
        this.all = function (req, res) {
            _this.Model.fetchAll().then(function (collection) {
                return res.json(collection);
            }).catch(function (err) {
                return res.json(new Error(err));
            });
        };
        this.create = function (req, res) {
            new _this.Model(req.body)
                .save()
                .then(function (model) {
                return res.json(model);
            });
        };
        this.get = function (req, res) {
            _this.Model.where('id', req.params.id)
                .fetch()
                .then(function (model) {
                return res.json(model);
            }).catch(function (err) {
                return res.json(new Error(err));
            });
        };
        this.update = function (req, res) {
            var id = req.params.id;
            new _this.Model({ id: id })
                .save(req.body)
                .then(function (model) {
                return res.json(model);
            })
                .catch(function (err) {
                return res.json(new Error(err));
            });
        };
        this.remove = function (req, res) {
            var id = req.params.id;
            _this.Model.forge({ id: id })
                .destroy()
                .then(function (model) {
                return res.json({
                    status: 'success',
                    msg: 'Record Successfully Delated',
                    data: model
                });
            })
                .catch(function (err) {
                return res.json(new Error(err));
            });
        };
        this.Model = Bookshelf.model(theModel);
    }
    return BaseController;
}());
exports.BaseController = BaseController;
