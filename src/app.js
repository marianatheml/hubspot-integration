const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const routes = require('./routes');

require('./config/Connection');

const app = express()

var corsOptions = {
    origin: "*",
    optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

class App {
    constructor() {
        this.app = app;
        this.middlewares();
        this.routes();
    }

    middlewares() {

        this.app.use(express.json());
        this.app.use(morgan('dev'));
        this.app.use((req, res, next) => {
            res.header("Access-Controll-Allow-Origin", "*");
            res.header("Access-Controll-Allow-Methods", "GET, POST, PUT, DELETE");
            res.header("Access-Controll-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");

            next();
        })
    }
    

    routes() {
        this.app.use(routes);
    }
}

module.exports = new App().app;