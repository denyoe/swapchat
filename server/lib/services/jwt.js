"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var jwt = __importStar(require("jsonwebtoken"));
exports.parse = function (req) {
    var token;
    if (req.headers['authorization']) {
        token = req.headers['authorization'].split(' ')[1];
    }
    else {
        token = req.body.token || req.query.token || req.headers['x-access-token'];
    }
    var decoded = jwt.decode(token);
    return decoded;
};
