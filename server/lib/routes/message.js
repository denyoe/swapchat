"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('../models/Post');
var express_1 = __importDefault(require("express"));
var MessageController_1 = require("../controllers/MessageController");
var MessageCtrl = new MessageController_1.MessageController('Post');
var router = express_1.default.Router();
router.get('/', MessageCtrl.all);
router.post('/', MessageCtrl.create);
router.get('/:id', MessageCtrl.get);
router.put('/:id', MessageCtrl.update);
router.patch('/:id', MessageCtrl.update);
router.delete('/:id', MessageCtrl.remove);
// router.get('/:id/posts', MessageCtrl.posts)
exports.default = router;
