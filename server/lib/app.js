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
var UserController_1 = require("./controllers/UserController");
var graphqlHTTP = require('express-graphql');
var dotenv = require('dotenv').config();
var Auth = require('./controllers/AuthController').default;
var express_validator_1 = __importDefault(require("express-validator"));
var typeDefs = require('./schema');
var App = /** @class */ (function () {
    function App() {
        // GraphQL schema
        this.schema = typeDefs;
        var UserCtrl = new UserController_1.UserController('User');
        // Root resolver
        this.root = {
            message: function () { return 'Hello World!'; },
            user: function (args) { return UserCtrl.byId(args.id); },
            channel: function () { return 'Hello World!'; },
            post: function () { return 'Hello World!'; },
            posts: function () { return 'Hello World!'; },
        };
        this.app = express_1.default();
        this.config();
    }
    App.prototype.config = function () {
        this.app.use(morgan_1.default('dev'));
        this.app.use(cors_1.default());
        this.app.use(body_parser_1.default.json());
        this.app.use(body_parser_1.default.urlencoded({ extended: false }));
        // this.app.use(cookieParser())
        this.app.use(express_validator_1.default());
        this.app.use(Auth.initialize());
        this.app.use('/grahql', graphqlHTTP({
            schema: this.schema,
            rootValue: this.root,
            graphiql: true
        }));
        this.app.use('/api/', index_1.default);
        this.app.use(process.env.API_BASE + 'login', Auth.login);
        this.app.use(process.env.API_BASE + 'user', user_1.default);
        this.app.use(process.env.API_BASE + 'channel', channel_1.default);
    };
    return App;
}());
exports.default = new App().app;
