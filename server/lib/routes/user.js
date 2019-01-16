"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* users. */
require('../models/User');
var express_1 = __importDefault(require("express"));
var UserController_1 = require("../controllers/UserController");
var UserCtrl = new UserController_1.UserController('User');
var router = express_1.default.Router();
var verifyToken = require('../middlewares/verifytoken');
router.use(verifyToken);
router.get('/', UserCtrl.all);
router.post('/', UserCtrl.create);
router.get('/:id', UserCtrl.get);
router.put('/:id', UserCtrl.update);
router.patch('/:id', UserCtrl.update);
router.delete('/:id', UserCtrl.remove);
router.get('/:id/posts', UserCtrl.posts);
exports.default = router;
