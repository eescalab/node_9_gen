

//MODULO EXPRESS

const express = require("express");
const morgan = require("morgan");


const app = express();
app.use(morgan("dev"))//middleware

//middleware 
app.use( '/productos', (req,res, next) => {
    console.log("Hola soy un middleware para productos");
    next();
})



app.get('/usuarios', (req,res)  => {

    res.json(
        {
            estado: true,
            producto: "usuarios"
        }
    )

})



app.get('/productos', (req,res)  => {

    res.json(
        {
            estado: true,
            producto: "productos"
        }
    )

})



app.listen(8080 , ()=> {

    console.log('Server Ok 8080');
})

