const express = require('express');
const morgan = require("morgan");


const app = express();

//body-parser
app.use(express.json())

//logg consola 
app.use(morgan("dev")); 

//modulo usuarios   
//localhost:8080/usuarios
app.use( require('./usuario/usuario.js') )

//localhost:8080/productos
app.use( require('./productos/productos.js') )


app.listen(8080, ()=>{
    console.log('Server Ok 8080');
 })