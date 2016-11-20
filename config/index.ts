import fs = require("fs");

import { ConnectionOptions } from 'mongoose';

/*
interface Configuration {
    alphaber:string,
    minLength:number
    port:number;
    views: {
        engine:string,
        dir:string,
    },
    database: {
        connectionStr:string,
        options: ConnectionOptions,

    },
    server: {
        schema:string,
        vhost: {
            domain:string,
            routesFolder:string
        }[],
    }
}
*/

export var options = {
    port: 3320,
    publicURL: 'https://rqe.es',
    views: {
        engine: "ejs",
        dir: "src/views"
    },
    database: {
        connectionString: "mongodb://mymongo:27017/rqe",
        options: {}
    },
    server: {
        schema: "http",
        vhost: {}
    },
    alphabet: "abcdefhijkmnopqrsuvwxyzACBDEFHJKMNPQRSUVWXYZ123456789",
    minLength: "4"
};

/*
let files = fs.readdirSync("./");
let conf:any = new Array<Object>();

for (let file of files) {
    let parsed:any = {};
    try {
        parsed = JSON.parse(fs.readFileSync(file).toString());
        conf.push(parsed);
    } catch (e) { }
}

switch (conf.length) {
    case 0:
        conf = {};
        break;
    case 1:
        conf = conf[0];
        break;
    default:
        conf = conf.filter((value:any) => {
            let result:boolean = false;

            if (typeof value == "object") {
                result = Object.getOwnPropertyNames(value).length > 0;
            }

            return result;
        });
        break;
}
*/