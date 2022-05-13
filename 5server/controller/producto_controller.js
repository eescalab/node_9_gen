const ModelProducto = require('../models/producto_model');
const { util_handler } = require('../middlewares/middleware_error');
const { json } = require('express/lib/response');

//==========
// [Param] 	getProducto
//==========

function getProducto(req, res, next, id) {
    
    let query = ModelProducto.findById(id);
    query.exec((err, doc ) => {
        if(err)  return util_handler(doc, next , err );

        req.docProducto = doc;
        next();
    });
}

//==========
//	Guardar Producto
//==========

function guardar (req, res, next){

    let data = {
        producto_nombre : req.body.producto_nombre,
        descripcion : req.body.descripcion,
        precio : req.body.precio,
        stock : req.body.stock,
        categoria_nombre : req.body.categoria_nombre
    }

    let Documento = new ModelProducto(data);
    Documento.save( (err, doc) => {

        
        if(err)  return util_handler(doc, next , err );
        
        return  res.json(doc);
        

        
    } )

}


//==========
//	Get Producto
//==========

function getxId(req, res, next){
    
    return res.json(req.docProducto);
}

//==========
//	Borrar Producto
//==========

function borrar(req, res, next){

    let docProducto = req.docProducto;

    docProducto.disponible = false;

    docProducto.save( (err, doc) => {
        if(err)  return util_handler(doc, next , err );
        res.json(doc);
    } );

    


    // let id = req.params.id;

    // ModelProducto.findByIdAndUpdate(
    //     id, 
    //     {disponible: false}, 
    //     {new: true}, (err, doc) => {
    //         if(err) return util_handler(docs, next, err);

    //         res.json(doc)

    //     });
}

//==========
//	Update Producto
//==========

async function update(req, res, next){

    let docProducto = req.docProducto;

    let data = {producto_nombre, descripcion, precio, stock} = req.body;

    docProducto = Object.assign(docProducto, data);
    
    docProducto.save( (err, doc ) => {
        if(err) return util_handler(docs, next, err);
        res.json(doc)
    })


    // let id = req.params.id;
    
    // let data = {producto_nombre, descripcion, precio, stock} = req.body;

    // console.log(data);
    // ModelProducto.findByIdAndUpdate(
    //     id, 
    //     data, 
    //     {new: true}, (err, doc) => {
    //         if(err) return util_handler(docs, next, err);

    //         res.json(doc)

    //     });
}





module.exports = {
    getProducto,
    guardar,
    getxId,
    borrar,
    update
}