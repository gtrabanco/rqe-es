"use strict";
const index_1 = require("../../config/index");
var Coder = require('base-encode');
var enc = new Coder(index_1.options.alphabet);
module.exports = enc;
