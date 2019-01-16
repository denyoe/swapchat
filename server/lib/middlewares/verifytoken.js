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
module.exports = function (req, res, next) {
    var token;
    if (req.headers['authorization']) {
        token = req.headers['authorization'].split(' ')[1];
    }
    else {
        token = req.body.token || req.query.token || req.headers['x-access-token'];
    }
    var secret = process.env.JWT_SECRET;
    if (token) {
        // verifies secret and checks exp
        jwt.verify(token, secret, function (err, decoded) {
            if (err) { // failed verification.
                return res.json({ "error": true });
            }
            req.decoded = decoded;
            next(); // no error, proceed
        });
    }
    else {
        // forbidden without token
        return res.status(403).json({
            "error": true
        });
    }
};
