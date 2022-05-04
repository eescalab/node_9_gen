const express = require('express');

const morgan = require("morgan");
const usuario_ruta =  require('./usuario/usuario.js');

const app = express();

//=====
// Middlewares
//======
    //body-parser
    app.use(express.json())

    //logg consola 
    app.use(morgan("dev")); 


//=====
// Rutas 
//======

    //modulo usuarios   
    //localhost:8080/usuarios
    app.use( usuario_ruta )

    //localhost:8080/productos
    app.use( require('./productos/productos.js') )
    


app.listen(8080, ()=>{
    console.log('Server Ok 8080');
 })