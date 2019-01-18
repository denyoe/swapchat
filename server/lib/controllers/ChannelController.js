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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var BaseController_1 = require("./BaseController");
var jwt_1 = require("../services/jwt");
var Post_1 = require("../models/Post");
var User_1 = require("../models/User");
var Channel_1 = require("../models/Channel");
var Subscription_1 = require("../models/Subscription");
var lodash_1 = __importDefault(require("lodash"));
var ChannelController = /** @class */ (function (_super) {
    __extends(ChannelController, _super);
    function ChannelController() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.all = function (req, res) {
            _this.Model
                .fetchAll({ withRelated: ['owner'] })
                .then(function (collection) { return res.json(collection); })
                .catch(function (err) { return res.json(err); });
        };
        _this.posts = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var id, username, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.params.id;
                        username = jwt_1.parse(req).username;
                        return [4 /*yield*/, new User_1.User({ username: username }).fetch()];
                    case 1:
                        user = _a.sent();
                        new this.Model({ id: id })
                            .fetch({ withRelated: ['posts.author', 'members', 'owner'] })
                            .then(function (model) {
                            var channel = model.toJSON();
                            if (lodash_1.default.flatMap(channel.members, 'id').indexOf(user.id) !== -1 || // user is member
                                user.id === channel.owner.id // user is owner
                            ) {
                                return res.status(200).json(channel.posts);
                            }
                            else {
                                return res.status(403).json({ error: "Permission Denied" });
                            }
                            // return res.json(model)
                        })
                            .catch(function (err) { return res.status(500).json(err); });
                        return [2 /*return*/];
                }
            });
        }); };
        _this.post = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var channel_id, username, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        channel_id = req.params.id;
                        username = jwt_1.parse(req).username;
                        return [4 /*yield*/, new User_1.User({ username: username }).fetch()];
                    case 1:
                        user = _a.sent();
                        new this.Model({ id: channel_id })
                            .fetch({ withRelated: ['members', 'owner'] })
                            .then(function (model) {
                            var channel = model.toJSON();
                            if (lodash_1.default.flatMap(channel.members, 'id').indexOf(user.id) !== -1 || // user is member
                                user.id === channel.owner.id // user is owner
                            ) {
                                new Post_1.Post({
                                    body: req.body.body,
                                    user_id: user.id,
                                    channel_id: channel_id
                                })
                                    .save()
                                    .then(function (model) { return res.status(201).json(model); })
                                    .catch(function (err) { return res.status(500).json(err); });
                            }
                            else {
                                return res.status(403).json({ error: "Permission Denied" });
                            }
                        })
                            .catch(function (err) { return res.json(err); });
                        return [2 /*return*/];
                }
            });
        }); };
        _this.members = function (req, res) {
            var id = req.params.id;
            new _this.Model({ id: id })
                .fetch({ withRelated: ['members', 'owner'] })
                .then(function (model) { return res.json(model); })
                .catch(function (err) { return res.json(err); });
        };
        _this.subscribe = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var channel_id, user_id, username, owner, sub;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        channel_id = req.params.id;
                        user_id = req.params.user_id;
                        username = jwt_1.parse(req).username;
                        return [4 /*yield*/, new User_1.User({ username: username }).fetch()
                            // check user is forum owner
                        ];
                    case 1:
                        owner = _a.sent();
                        return [4 /*yield*/, new Channel_1.Channel({ id: channel_id, user_id: owner.id }).fetch()];
                    case 2:
                        // check user is forum owner
                        if (!(_a.sent())) {
                            return [2 /*return*/, res.status(403).json({ error: "Permission Denied" })];
                        }
                        sub = new Subscription_1.Subscription({
                            user_id: user_id,
                            channel_id: channel_id
                        });
                        sub
                            .fetch()
                            .then(function (model) {
                            if (model === null) {
                                sub.save().then(function () {
                                    res.status(201).json(model);
                                })
                                    .catch(function (err) { return res.json(err); });
                            }
                            else {
                                return res.status(422).json({ error: 'user already subscribed' });
                            }
                        })
                            .catch(function (err) { return res.status(500).json(err); });
                        return [2 /*return*/];
                }
            });
        }); };
        _this.unsubscribe = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var channel_id, user_id, username, owner;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        channel_id = req.params.id;
                        user_id = req.params.user_id;
                        username = jwt_1.parse(req).username;
                        return [4 /*yield*/, new User_1.User({ username: username }).fetch()
                            // check user is forum owner
                        ];
                    case 1:
                        owner = _a.sent();
                        return [4 /*yield*/, new Channel_1.Channel({ id: channel_id, user_id: owner.id }).fetch()];
                    case 2:
                        // check user is forum owner
                        if (!(_a.sent())) {
                            return [2 /*return*/, res.status(403).json({ error: "Permission Denied" })];
                        }
                        Subscription_1.Subscription.forge({
                            user_id: user_id,
                            channel_id: channel_id
                        })
                            .fetch()
                            .then(function (model) {
                            if (model) {
                                model.destroy().then(function () { return res.json({ msg: 'record deleted' }); });
                            }
                            else {
                                res.json({ msg: 'user not subscribed' });
                            }
                        })
                            .catch(function (err) { return res.status(500).json(err); });
                        return [2 /*return*/];
                }
            });
        }); };
        return _this;
    }
    return ChannelController;
}(BaseController_1.BaseController));
exports.ChannelController = ChannelController;
