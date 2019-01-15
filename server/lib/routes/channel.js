"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('../models/Channel');
var express_1 = __importDefault(require("express"));
var ChannelController_1 = require("../controllers/ChannelController");
var ChannelCtrl = new ChannelController_1.ChannelController('Channel');
var router = express_1.default.Router();
router.get('/', ChannelCtrl.all);
router.post('/', ChannelCtrl.create);
router.get('/:id', ChannelCtrl.get);
router.put('/:id', ChannelCtrl.update);
router.patch('/:id', ChannelCtrl.update);
router.delete('/:id', ChannelCtrl.remove);
router.post('/:id/message', ChannelCtrl.post);
exports.default = router;
