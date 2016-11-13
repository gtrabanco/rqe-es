"use strict";
exports.options = {
    port: 3320,
    publicURL: 'http://localhost:3000',
    views: {
        engine: "ejs",
        dir: "src/views"
    },
    database: {
        connectionString: "mongodb://127.0.0.1:27017/rqe",
        options: {}
    },
    server: {
        schema: "http",
        vhost: {}
    },
    alphabet: "abcdefhijkmnopqrsuvwxyzACBDEFHJKMNPQRSUVWXYZ123456789",
    minLength: "4"
};
