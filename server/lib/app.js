"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var morgan_1 = __importDefault(require("morgan"));
var body_parser_1 = __importDefault(require("body-parser"));
var index_1 = __importDefault(require("./routes/index"));
var user_1 = __importDefault(require("./routes/user"));
var channel_1 = __importDefault(require("./routes/channel"));
var App = /** @class */ (function () {
    function App() {
        this.app = express_1.default();
        this.config();
    }
    App.prototype.config = function () {
        this.app.use(morgan_1.default('dev'));
        this.app.use(cors_1.default());
        this.app.use(body_parser_1.default.json());
        this.app.use(body_parser_1.default.urlencoded({ extended: false }));
        // app.use(cookieParser())
        this.app.use('/api/', index_1.default);
        this.app.use('/api/user', user_1.default);
        this.app.use('/api/channel', channel_1.default);
    };
    return App;
}());
exports.default = new App().app;
