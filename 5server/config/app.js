const express = require('express');
const morgan = require("morgan");

const routerV1 = require('../routers/v1/index.js')
const { handler } = require('../middlewares/middleware_error')
const app = express();

//*Middlewares

    //body-parser
    app.use(express.json())

    //logg consola 
    app.use(morgan("dev")); 

    //Routers
    routerV1(app);

    //HANDLER
    app.use( handler )

module.exports = app;