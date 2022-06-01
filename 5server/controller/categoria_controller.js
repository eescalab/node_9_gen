const ModelCategoria = require('../models/categoria_model');
const { util_handler } = require("../middlewares/middleware_error");
//==========
//	Guardar Categoria
//==========
function guardar(req, res, next){
    //Cuerpo metodo Post 

    console.log(req.body);

    
    let data = {
        categoria_nombre : req.body.categoria_nombre
    }

    let documento = ModelCategoria(data);

    documento.save( (err, doc) => {
        
        if(err)  return util_handler(doc, next, err)

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
        return res.json( docs );
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
        
        if(err) return util_handler(doc, next, err)

        return res.json(doc);
    })
    

}


module.exports = {
    guardar,
    listar,
    actualizar
}