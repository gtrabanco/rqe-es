"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const mongoose_1 = require('mongoose');
const config_1 = require('../../../config');
const database_1 = require('../../services/database');
const autoIncrement = require('mongoose-auto-increment');
exports.Coder = require('../../lib/Coder');
const UrlSchema = new mongoose_1.Schema({
    urlId: {
        type: mongoose_1.SchemaTypes.Number,
        required: true,
        index: {
            unique: true
        }
    },
    url: {
        type: mongoose_1.SchemaTypes.String,
        required: true,
        index: {
            unique: true
        }
    },
    created: {
        type: mongoose_1.SchemaTypes.Date,
        default: Date.now,
        required: true
    },
    updated: {
        type: mongoose_1.SchemaTypes.Date,
        default: Date.now,
        required: false
    }
}, {
    toObject: {
        virtuals: true
    },
    toJSON: {
        virtuals: true
    }
});
UrlSchema.statics.getByStringId = (str) => __awaiter(this, void 0, void 0, function* () {
    let id = parseInt(exports.Coder.decode(str));
    let url = database_1.mongoose.model('Url');
    try {
        let result = yield url.findOne({ urlId: id });
        return result;
    }
    catch (e) {
        return Promise.reject(e);
    }
});
UrlSchema.virtual('publicShortUrl').get(function () {
    return config_1.options.publicURL + '/' + exports.Coder.encode(parseInt(this.urlId));
});
UrlSchema.virtual('codedId').get(function () {
    return exports.Coder.encode(this.urlId);
});
UrlSchema.pre('save', (next) => {
    this.updated = new Date();
    return next();
});
autoIncrement.initialize(database_1.mongoose.connection);
UrlSchema.plugin(autoIncrement.plugin, {
    model: 'Url',
    field: 'urlId',
    startAt: Math.pow(config_1.options.alphabet.length, parseInt(config_1.options.minLength)),
    incrementBy: 1
});
exports.Url = database_1.mongoose.model('Url', UrlSchema);
