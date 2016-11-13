"use strict";

import { Request, Response, NextFunction, Router } from "express";
import { UrlModel, Url } from '../../../models/url/model';
import {options} from '../../../../config';


Url.remove();


export class ApiV1Index {
    static routes():Router {
        return  Router().get('/api/v1/:strId', async (req:Request, res:Response) => {

            console.log(req.params);
            res.jsonp(req.params);


        }).post('/api/v1', async (req:Request, res:Response) => {

            console.log(req.body);

            res.jsonp(req.body)
        });

    }
}