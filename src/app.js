"use strict";
const bodyParser = require("body-parser");
const express = require("express");
const path = require("path");
const logger = require("morgan");
const index_1 = require("./routes/index");
const index_2 = require("../config/index");
class Server {
    constructor() {
        this.app = express();
        this.config();
        this.routes();
    }
    static bootstrap() {
        return new Server();
    }
    routes() {
        let router;
        router = express.Router();
        router.use(index_1.Index.routes());
        this.app.use(router);
    }
    config() {
        this.app.set("views", path.join(__dirname, "views"));
        this.app.set("view engine", "ejs");
        this.app.use(logger("dev"));
        this.app.set("config", index_2.options);
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(express.static(path.join(__dirname, "public")));
        this.app.use(express.static(path.join(__dirname, "bower_components")));
        this.app.use(function (err, req, res, next) {
            var error = new Error("Not Found");
            err.status = 404;
            next(err);
        });
    }
}
var server = Server.bootstrap();
module.exports = server.app;
