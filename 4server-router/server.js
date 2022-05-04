const express = require("express");
const morgan = require("morgan");

const routerV1 = require("./routers/v1/index.js");

const app = express();

//=====
// Middlewares
//======

    //body-parser
    app.use(express.json());

    //morgan
    app.use(morgan("dev"));


//=====
// ROUTERS
//======
    routerV1(app);



//-----------

app.listen(8080, ()=>{
    console.log('Server Ok 8080');
 })
