import { Schema, Document, Model, SchemaTypes } from 'mongoose';
import { mongoose } from '../../services/database';


export interface IAccess extends Document {
    _urlId: Object,
    userAgent: string,
    ip: string,
    encoding :string,
    lang: string,
    referer: string,
    created: Date
}


export interface IAccessModel {
}

const AccessSchema = new Schema({
    _urlId: {
        type: SchemaTypes.ObjectId,
        ref: 'Url',
        required: true
    },
    userAgent: {
        type: SchemaTypes.String,
        required: true,
        index: {
            unique: true
        }
    },
    ip: {
        type: SchemaTypes.String,
        required: true
    },
    encoding: {
        type: SchemaTypes.String,
        required: true
    },
    lang: {
        type: SchemaTypes.String
    },
    referer: {
        type: SchemaTypes.String
    },
    created: {
        type: SchemaTypes.Date,
        default: Date.now,
        required: true
    }
}, {
    toObject: {
        virtuals: true
    },
    toJSON: {
        virtuals: true
    }
});



export type AccessModel = Model<IAccess> & IAccessModel & IAccess;

export const Access:AccessModel = <AccessModel>mongoose.model<IAccess>('Access', AccessSchema);