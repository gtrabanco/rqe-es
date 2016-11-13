"use strict";
const index_1 = require("../../config/index");
function checkValidStrId(str) {
    for (let i = 0; i < str.length; i++) {
        if (index_1.options.alphabet.indexOf(str[i]) == -1) {
            return false;
        }
    }
    return true;
}
exports.checkValidStrId = checkValidStrId;
