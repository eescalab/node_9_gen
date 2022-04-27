

//CORE MODULES

const http = require('http');

const port = '3000';


             

const server = http.createServer( (req,res) => {

    console.log(req.method);
    console.log(req.url);
    
    // localhost:3000/usuarios  -GET 
    // localhost:3000/productos - POST 

    if(req.method == 'POST'){
        res.write("Hola POST");
    }else if(req.method == 'DELETE'){
        res.write("Hola DELETE");
    }
    else if(req.method == 'GET' && req.url == '/usuarios/'){
        res.write("listar usuarios");
    }

    else if(req.method == 'GET' && req.url == '/productos/'){
        res.write("listar productos");
    }

    res.end();

} );


server.listen(port, ()=> {
    console.log("Server Ok port 3000");
} )