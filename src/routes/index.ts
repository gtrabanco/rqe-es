/// <reference path="../_all.d.ts" />
"use strict";

import * as express from "express";

module Route {

    export class Index {

        public index(req: express.Request, res: express.Response, next: express.NextFunction) {

            //render page
            res.render("index", {title: "Welcome ExpressJS!", message: "Your express with typescript was setup sucessfully."});
        }
    }
}

export = Route;