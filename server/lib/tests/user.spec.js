"use strict";
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
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var k = require('knex');
var config = require('../../knexfile.js');
var request = require('supertest');
var app_1 = __importDefault(require("../app"));
var knex = k(config.staging);
// const knex = k(config.testing)
describe('User Resource', function () {
    // admin : password
    var token;
    beforeAll(function (done) { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            knex('users')
                .where('id', 999)
                .then(function (rows) {
                if (rows.length === 0) {
                    return knex('users').insert([
                        { id: 999, username: 'admin', password: '$2a$10$RGWd9twc/BQZArd9aSdpRelkIGq3EQhAlua2.DIMG.6iaRmtPBP4C' }
                    ]);
                }
            });
            request(app_1.default)
                .post('/api/login')
                .send({
                username: 'admin', password: 'password'
            })
                .end(function (err, response) {
                var tmp = response.body.token;
                if (tmp) {
                    token = tmp.split(' ')[1];
                }
                done();
            });
            return [2 /*return*/];
        });
    }); });
    afterAll(function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: 
                // await knex.raw('TRUNCATE TABLE channels users')
                return [4 /*yield*/, knex('users').where('id', 999).del()];
                case 1:
                    // await knex.raw('TRUNCATE TABLE channels users')
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    describe('CRUD', function () {
        it('It should require authorization', function (done) {
            return request(app_1.default)
                .get('/api/user/999')
                .then(function (res) {
                expect(res.statusCode).toBe(401);
                done();
            });
        });
        it('return 404', function (done) {
            return request(app_1.default).get('/undefined')
                .then(function (res) {
                expect(res.statusCode).toBe(404);
                done();
            });
        });
        it('can CREATE new user', function () { return request(app_1.default).post('/api/user')
            .set('Authorization', "Bearer " + token)
            .send({ 'username': 'marcek', 'password': 'markword' })
            .then(function (res) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        expect(res.type).toBe('application/json');
                        expect(res.statusCode).toBe(201);
                        expect(res.body.username).toBe('marcek');
                        return [4 /*yield*/, knex('users').where('id', res.body.id).del()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); }); });
        it('can GET a user', function (done) { return __awaiter(_this, void 0, void 0, function () {
            var id;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, knex('users').insert([
                            { username: 'koffi', password: 'pass' }
                        ])];
                    case 1:
                        id = _a.sent();
                        return [2 /*return*/, request(app_1.default).get('/api/user/' + id)
                                .set('Authorization', "Bearer " + token)
                                .expect(200)
                                .then(function (res) { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            expect(res.type).toBe('application/json');
                                            expect(res.statusCode).toBe(200);
                                            expect(res.body.username).toBe('koffi');
                                            return [4 /*yield*/, knex('users').where('id', id).del()];
                                        case 1:
                                            _a.sent();
                                            done();
                                            return [2 /*return*/];
                                    }
                                });
                            }); })];
                }
            });
        }); });
        it('can UPDATE a user', function (done) { return __awaiter(_this, void 0, void 0, function () {
            var user;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, knex('users').insert([
                            { username: 'sam', password: 'samwise' }
                        ])];
                    case 1:
                        user = _a.sent();
                        request(app_1.default)
                            .put('/api/user/' + user)
                            .set('Authorization', "Bearer " + token)
                            .send({ 'username': 'sammy' })
                            .expect(200)
                            .then(function (res) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        expect(res.type).toBe('application/json');
                                        expect(res.statusCode).toBe(200);
                                        expect(res.body.username).toBe('sammy');
                                        return [4 /*yield*/, knex('users').where('id', user).del()];
                                    case 1:
                                        _a.sent();
                                        done();
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                        return [2 /*return*/];
                }
            });
        }); });
        it('can DELETE a user', function () { return __awaiter(_this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, knex('users').insert([
                            { username: 'sam', password: 'samwise' }
                        ])];
                    case 1:
                        user = _a.sent();
                        return [2 /*return*/, request(app_1.default)
                                .delete('/api/user/' + user)
                                .set('Authorization', "Bearer " + token)
                                .expect(200)
                                .then(function (res) {
                                expect(res.type).toBe('application/json');
                                expect(res.statusCode).toBe(200);
                            })];
                }
            });
        }); });
    });
});
