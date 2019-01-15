"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* users. */
var express_1 = __importDefault(require("express"));
var UserController_1 = require("../controllers/UserController");
var router = express_1.default.Router();
router.get('/', UserController_1.all);
router.post('/', UserController_1.create);
router.get('/:id', UserController_1.get);
router.put('/:id', UserController_1.update);
router.delete('/:id', UserController_1.remove);
router.get('/:id/posts', UserController_1.posts);
exports.default = router;
