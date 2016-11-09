/// <reference path="../_all.d.ts" />
"use strict";
var Route;
(function (Route) {
    var Index = (function () {
        function Index() {
        }
        Index.prototype.index = function (req, res, next) {
            //render page
            res.render("index", { title: "Welcome ExpressJS!", message: "Your express with typescript was setup sucessfully." });
        };
        return Index;
    }());
    Route.Index = Index;
})(Route || (Route = {}));
module.exports = Route;
