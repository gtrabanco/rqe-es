"use strict";

import { Request, Response, NextFunction, Router } from "express";
import { Url, UrlModel } from '../models/url/model';
import { URLValidator } from '../lib/url.validator';
import { checkValidStrId } from '../lib/checkValidStrId';
import {DocumentQuery} from "mongoose";



export class Index {
    static routes():Router {
        return  Router().get('/:strId?', async (req:Request, res:Response) => {

            let strId = req.params.strId;

            if(!strId || !checkValidStrId(strId)) {
                return res.render('index');
            }

            try {
                let url = await Url.getByStringId(strId);

                return res.redirect(301, url.url)
            } catch (e) {

                return res.render('index', {
                    status: 400,
                    data: {
                        message: "There is no url fot the id \"" + strId + "\""
                    }
                });
            }

        }).post('/', async (req:Request, res:Response) => {

            let responseObj = {
                status: 400,
                data: {

                }
            };


            if (!req.body.url || req.body.url.length <= 0 || !URLValidator(req.body.url)) {

                responseObj.data = {message: 'No valid url or empty'};

                return res.render('index', responseObj);
            }

            var url:any;

            try {

                url = await Url.findOne({url: req.body.url});

                responseObj.status = 200;
                responseObj.data = {url: url.publicShortUrl};

                return res.render('index', responseObj);
            } catch(e) { }

            try {
                url = await Url.create({url: req.body.url});
                responseObj.status = 200;
                responseObj.data = { url: url.publicShortUrl};
            } catch (e) {
                responseObj.data =  { message: 'Url can not be added to the database' };
            }

            return res.render('index', responseObj);
        });
    }
}