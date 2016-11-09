"use strict";
var fs = require("fs");
var files = fs.readdirSync("./");
var conf = new Array();
for (var _i = 0, files_1 = files; _i < files_1.length; _i++) {
    var file = files_1[_i];
    var parsed = {};
    try {
        parsed = JSON.parse(fs.readFileSync(file).toString());
        conf.push(parsed);
    }
    catch (e) { }
}
switch (conf.length) {
    case 0:
        conf = {};
        break;
    case 1:
        conf = conf[0];
        break;
    default:
        conf = conf.filter(function (value) {
            var result = false;
            if (typeof value == "object") {
                result = Object.getOwnPropertyNames(value).length > 0;
            }
            return result;
        });
        break;
}
module.exports = conf;
