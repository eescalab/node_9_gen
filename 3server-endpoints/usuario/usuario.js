const express = require('express');
const app = express();



const data = [
    {
        id:123,
        nombre: "admin"
    },
    {
        id:124,
        nombre: "tecnico"
    }
]

//=====
// Listar Usuarios
//======
//localhost:8080/usuarios?idusuairo=123&idDireccion=124&
app.get('/usuarios' , function metodo1 (req,res)  {

    console.log(req.query);

    res.json({
        data: data
    });


})

//=====
// Get Usuario
//======

app.get('/usuarios/:idusuarios' , (req,res) => {

    
    let idUsuario = req.params.idusuarios;
    console.log('idusuario',idUsuario);


    res.json({
        data: data.filter( items=> items.id == idUsuario  )
    });


})

//=====
// Post Usuario
//======

app.post('/usuarios' , (req,res) => {

    console.log(req.body);

    data.push(req.body)

    res.json({
        data: data
    });


})

//=====
// Borrar Usuario
//======

app.delete('/usuarios/:idusuarios' , (req,res) => {

    
    let idUsuario = req.params.idusuarios;
    res.json({
        data: data.filter(xx => xx.id !=idUsuario )
    });


})





module.exports = app;