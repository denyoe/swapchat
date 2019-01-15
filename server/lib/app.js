"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
// const cookieParser = require('cookie-parser')
var cors_1 = __importDefault(require("cors"));
var morgan_1 = __importDefault(require("morgan"));
var body_parser_1 = __importDefault(require("body-parser"));
var index_1 = __importDefault(require("./routes/index"));
var user_1 = __importDefault(require("./routes/user"));
var app = express_1.default();
app.use(morgan_1.default('dev'));
app.use(express_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: false }));
// app.use(express.urlencoded({ extended: false }))
app.use(body_parser_1.default.json());
app.use(cors_1.default());
// app.use(cookieParser())
app.use('/api/', index_1.default);
app.use('/api/user', user_1.default);
app.listen(4000, function () { return console.log('Chat Server running. Port: 4000. Enjoy!'); });
