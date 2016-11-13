"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const express_1 = require("express");
const model_1 = require('../../../models/url/model');
model_1.Url.remove();
class ApiV1Index {
    static routes() {
        return express_1.Router().get('/api/v1/:strId', (req, res) => __awaiter(this, void 0, void 0, function* () {
            console.log(req.params);
            res.jsonp(req.params);
        })).post('/api/v1', (req, res) => __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            res.jsonp(req.body);
        }));
    }
}
exports.ApiV1Index = ApiV1Index;
