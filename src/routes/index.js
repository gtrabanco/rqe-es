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
const model_1 = require('../models/url/model');
const url_validator_1 = require('../lib/url.validator');
const checkValidStrId_1 = require('../lib/checkValidStrId');
class Index {
    static routes() {
        return express_1.Router().get('/:strId?', (req, res) => __awaiter(this, void 0, void 0, function* () {
            let strId = req.params.strId;
            if (!strId || !checkValidStrId_1.checkValidStrId(strId)) {
                return res.render('index');
            }
            try {
                let url = yield model_1.Url.getByStringId(strId);
                return res.redirect(301, url.url);
            }
            catch (e) {
                return res.render('index', {
                    status: 400,
                    data: {
                        message: "There is no url fot the id \"" + strId + "\""
                    }
                });
            }
        })).post('/', (req, res) => __awaiter(this, void 0, void 0, function* () {
            let responseObj = {
                status: 400,
                data: {}
            };
            if (!req.body.url || req.body.url.length <= 0 || !url_validator_1.URLValidator(req.body.url)) {
                responseObj.data = { message: 'No valid url or empty' };
                return res.render('index', responseObj);
            }
            var url;
            try {
                url = yield model_1.Url.findOne({ url: req.body.url });
                responseObj.status = 200;
                responseObj.data = { url: url.publicShortUrl };
                return res.render('index', responseObj);
            }
            catch (e) { }
            try {
                url = yield model_1.Url.create({ url: req.body.url });
                responseObj.status = 200;
                responseObj.data = { url: url.publicShortUrl };
            }
            catch (e) {
                responseObj.data = { message: 'Url can not be added to the database' };
            }
            return res.render('index', responseObj);
        }));
    }
}
exports.Index = Index;
