export var options = {
    port: 3320,
    publicURL: 'https://rqe.es',
    views: {
        engine: "ejs",
        dir: "src/views"
    },
    database: {
        connectionString: "mongodb://mymongo:27017/rqe"
        options: {}
    },
    server: {
        schema: "http",
        vhost: {}
    },
    alphabet: "abcdefhijkmnopqrsuvwxyzACBDEFHJKMNPQRSUVWXYZ123456789",
    minLength: "4",
    recaptcha: {
        privateKey: "",
        publicKey: ""
    }
};