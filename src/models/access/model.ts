import { Schema, Document, Model, SchemaTypes } from 'mongoose';
import { options } from '../../../config';
import { mongoose } from '../../services/database';
import * as autoIncrement from 'mongoose-auto-increment';


export interface IAccess extends Document {
    userAgent:string,
    ip:string,
    encoding:string,
    lang:string
}


export interface IUrlModel {
    getByStringId(str:string):Promise<IUrl>;
}

const UrlSchema = new Schema({
    urlId: {
        type: SchemaTypes.Number,
        required: true,
        index: {
            unique: true
        }
    },
    url: {
        type: SchemaTypes.String,
        required: true,
        index: {
            unique: true
        }
    },
    created: {
        type: SchemaTypes.Date,
        default: Date.now,
        required: true
    },
    updated: {
        type:SchemaTypes.Date,
        default: Date.now,
        required: false
    }
}, {
    toObject: {
        virtuals: true
    },
    toJSON: {
        virtuals: true
    }
});


UrlSchema.statics.getByStringId = async (str:string):Promise<Document> => {

    let id:number = parseInt(Coder.decode(str));
    let url:Model<Document> = mongoose.model('Url');

    try {
        let result = await url.findOne({urlId:id});

        return result;
    } catch (e) {
        return Promise.reject(e);
    }
};

UrlSchema.virtual('publicShortUrl').get(function () {
    return options.publicURL + '/' + Coder.encode(parseInt(this.urlId));
});

UrlSchema.virtual('codedId').get(function () {
    return Coder.encode(this.urlId);
});


UrlSchema.pre('save', (next:any) => {
    this.updated = new Date();
    return next();
});


//AutoIncrement Plugin
//Initialize auto increment
autoIncrement.initialize(mongoose.connection);

//Auto Increment Schema
UrlSchema.plugin(autoIncrement.plugin, {
    model: 'Url',
    field: 'urlId',
    startAt: Math.pow(options.alphabet.length, parseInt(options.minLength)),
    incrementBy: 1
});


export type UrlModel = Model<IUrl> & IUrlModel & IUrl;

export const Url:UrlModel = <UrlModel>mongoose.model<IUrl>('Url', UrlSchema);