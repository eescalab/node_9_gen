const express = require("express");
const morgan = require("morgan");
var cors = require('cors')
const fileUpload = require('express-fileupload');
const swaggerUI = require("swagger-ui-express");
const swaggerConfig = require("./swagger.config.json");
const swaggerJsdoc = require("swagger-jsdoc");

const routerV1 = require("../routers/v1/index.js");
const { handler } = require("../middlewares/middleware_error");
const app = express();

//*Middlewares

//body-parser
app.use(express.json());

//File Upload
app.use(fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
  }));

//Cors
app.use(cors())

//logg consola
app.use(morgan("dev"));

//Swagger
const swaggerDocs = swaggerJsdoc(swaggerConfig);
app.use(
"/api/docs",
swaggerUI.serve,swaggerUI.setup(swaggerDocs, { explorer: true }));

//Routers
routerV1(app);

//HANDLER
app.use(handler);

module.exports = app;
