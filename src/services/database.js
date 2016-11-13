"use strict";
const mongoose = require("mongoose");
exports.mongoose = mongoose;
const config_1 = require('../../config');
mongoose.Promise = global.Promise;
mongoose.connection.once('open', function () {
    console.info('Connected to the database');
});
mongoose.connection.on('error', function (error) {
    console.error('Registered the next error on database: ', error);
});
let connectionString = (config_1.options && config_1.options.database && config_1.options.database.connectionString ? config_1.options.database.connectionString : 'mongodb://127.0.0.1/rqe');
mongoose.connect(connectionString);
