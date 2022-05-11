const ModelCategoria = require('../models/categoria_model');

//==========
//	Guardar Categoria
//==========
function guardar(req, res){
    //Cuerpo metodo Post 

    console.log(req.body);

    
    let data = {
        categoria_nombre : req.body.categoria_nombre
    }

    let documento = ModelCategoria(data);

    documento.save( (err, doc) => {


        return res.json({
            data : doc
        })
    
    });

    

}

//==========
//	Listar Categoria
//==========

function listar(req, res) {

    ModelCategoria.find( (err, docs) => {
        res.json( docs );
    } );
}

//==========
//	Update Categoria
//==========
//localhost:3000/producto/:id

function actualizar(req , res ) {

    const id = req.params.id;

    let data = {
        categoria_nombre: req.body.categoria_nombre,
        status : req.body.status

    }

    ModelCategoria.findByIdAndUpdate(id, data , {new: true}, (err, doc ) => {
        res.json(doc);
    })
    

}


module.exports = {
    guardar,
    listar,
    actualizar
}