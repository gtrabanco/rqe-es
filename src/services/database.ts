import mongoose = require("mongoose");
// import mockgoose = require("mockgoose");
import { options } from '../../config';

mongoose.Promise = global.Promise;

mongoose.connection.once('open', function () {
    console.info('Connected to the database');
});

mongoose.connection.on('error', function (error:any) {
    console.error('Registered the next error on database: ', error);
});

// mockgoose(mongoose).then((): void => { mongoose.connect("mongodb://example.com/TestingDB") });

let connectionString = (options && options.database && options.database.connectionString? options.database.connectionString: 'mongodb://127.0.0.1/rqe');

mongoose.connect(connectionString);

export { mongoose };