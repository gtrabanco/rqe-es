"use strict";

import { Request, Response, Router } from "express";
import { Url, UrlModel } from '../models/url/model';
import { URLValidator } from '../lib/url.validator';
import { checkValidStrId } from '../lib/checkValidStrId';
import {options} from "../../config/index";
var Recaptcha = require('node-recaptcha2').Recaptcha;



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
                    },
                    recaptcha: options.recaptcha.publicKey
                });
            }

        }).post('/', async (req:Request, res:Response) => {

            let responseObj = {
                status: 400,
                data: {

                },
                recaptcha: options.recaptcha.publicKey
            };

            let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.ip || null;
            let code = req.body['g-recaptcha-response'] || '';
            let data = {
                remoteip: ip,
                response: code
            };

            try {

                let captcha = new Recaptcha(
                    options.recaptcha.publicKey,
                    options.recaptcha.privateKey,
                    data
                );

                let sucess = await captcha.verify();

            } catch (e) {

                responseObj.data.message = 'Invalid captcha';
                return res.render('index', responseObj);
            }


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