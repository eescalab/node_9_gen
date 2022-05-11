const ModelProducto = require('../models/producto_model');



//==========
//	Guardar Producto
//==========

function guardar (req, res){

    let data = {
        producto_nombre : req.body.producto_nombre,
        descripcion : req.body.descripcion,
        precio : req.body.precio,
        stock : req.body.stock,
        categoria_nombre : req.body.categoria_nombre
    }

    let Documento = new ModelProducto(data);
    Documento.save( (err, doc) => {

        console.log(err);
        if(err){
            return res.status(400).json(err)
        }else {
            res.json(doc);
        }

        
    } )

}

module.exports = {
    guardar
}