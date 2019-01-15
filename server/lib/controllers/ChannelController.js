"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var BaseController_1 = require("./BaseController");
var ChannelController = /** @class */ (function (_super) {
    __extends(ChannelController, _super);
    function ChannelController() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.posts = function (req, res) {
            var id = req.params.id;
            new _this.Model({ id: id })
                .fetch({ withRelated: ['posts'] })
                .then(function (model) {
                return res.json(model);
            })
                .catch(function (err) {
                return res.json(new Error(err));
            });
        };
        _this.post = function (req, res) {
            var id = req.params.id;
            new _this.Model({ id: id })
                .posts()
                .save({
                user_id: 1
            })
                .then(function (model) {
                return res.json(model);
            });
        };
        return _this;
    }
    return ChannelController;
}(BaseController_1.BaseController));
exports.ChannelController = ChannelController;
