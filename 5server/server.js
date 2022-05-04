const express = require('express');
const morgan = require("morgan");
const mongoose = require('mongoose');

const app = express();

//=====
// Middlewares
//======

    //body-parser
    app.use(express.json())

    //logg consola 
    app.use(morgan("dev")); 


    
//"mongoose": "^5.12.2"
mongoose.connect('mongodb://localhost:27017/test').then(  ()=>{
    console.log('Mongo Ok');
    
})

app.listen(8080, ()=>{
    console.log('Server Ok 8080');
})