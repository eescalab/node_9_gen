const ModelProducto = require("../models/producto_model");
const { util_handler } = require("../middlewares/middleware_error");
const res = require("express/lib/response");

//==========
// [Param] 	getProducto
//==========

function getProducto(req, res, next, id) {
  let query = ModelProducto.findById(id);
  query.exec((err, doc) => {
    if (err) return util_handler(doc, next, err);

    req.docProducto = doc;
    next();
  });
}

//==========
//	Guardar Producto
//==========

function guardar(req, res, next) {
  let data = {
    producto_nombre: req.body.producto_nombre,
    descripcion: req.body.descripcion,
    precio: req.body.precio,
    stock: req.body.stock,
    categoria_nombre: req.body.categoria_nombre,
  };

  console.log(req.files);



  let Documento = new ModelProducto(data);
  
  console.log(Documento);

  if(req.files){
    Documento.imagen.data = req.files.imagen.data;
    Documento.imagen.contentType = req.files.imagen.mimetype;

    // Documento.imagen.data = req.files.imagen.data;
    // Documento.imagen.contentType = req.files.imagen.mimetype;
  }

  Documento.save((err, doc) => {
    if (err) return util_handler(doc, next, err);

    return res.json({
      data: doc
    });
  });
}

//==========
//	Get Producto
//==========

function getxId(req, res, next) {
  return res.json(req.docProducto);
}

//==========
//	Borrar Producto
//==========

function borrar(req, res, next) {
  let docProducto = req.docProducto;

  docProducto.disponible = false;

  docProducto.save((err, doc) => {
    if (err) return util_handler(doc, next, err);
    res.json(doc);
  });

  //   let id = req.params.id;

  //   ModelProducto.findByIdAndUpdate(
  //       id,
  //       {disponible: false},
  //       {new: true}, (err, doc) => {
  //           if(err) return util_handler(docs, next, err);

  //           res.json(doc)

  //       });
}

//==========
//	Update Producto
//==========

function update(req, res, next) {
  let docProducto = req.docProducto;

  let data = ({ producto_nombre, descripcion, precio, stock } = req.body);

  docProducto = Object.assign(docProducto, data);

  docProducto.save((err, doc) => {
    if (err) return util_handler(doc, next, err);
    res.json(doc);
  });

  //   let id = req.params.id;

  //   let data = {producto_nombre, descripcion, precio, stock} = req.body;

  //   console.log(data);
  //   ModelProducto.findByIdAndUpdate(
  //       id,
  //       data,
  //       {new: true}, (err, doc) => {
  //           if(err) return util_handler(docs, next, err);

  //           res.json(doc)

  //       });
}

function imagen(req, res, next) {

  
  let idProucto = req.params.id;
  console.log('idProucto, ',idProucto);
  if(!idProucto) {
    let error = new Error("No encontrado !");
    error.statusCode = 404;
    return next(error);
  }
  console.log('idProucto',idProucto);
  ModelProducto.findById(idProucto, (err, doc , next) => {
   
    // console.log('doc',doc);
    if(err) return util_handler(doc, next, err);
    
      res.set('Content-Type', doc.imagen.contentType);
      return res.send(doc.imagen.data);
    
    

  })
  
}

async function listar_paginate1(req, res, next){
  try {
    
    const page = req.query.page;
    const limit = req.query.limit;
    const skip = (page -1) * limit;

    const data = await ModelProducto.find()
      .sort({createdAt: -1})
      .skip(skip)
      .limit(limit);

    const dataCount = await ModelProducto.countDocuments();

    const totalPages = Math.ceil(dataCount / limit);

    return res.status(200).send({
      data: data,
      paging: {
        total: dataCount,
        page: page || 1,
        totalpages : totalPages || 1
      }
    })


  } catch (error) {
    return next(error);
  }
}


async function listar_paginate2(req, res, next){
  try {
    
    let options = {page, limit} = req.query;
    console.log(options);

    const data = await ModelProducto.paginate({} , options);

    return res.status(200).send({
      data
    })


  } catch (error) {
    return next(error);
  }
}


function getxCategoria(req, res, next) {
  console.log('req.params:', req.params);

  let categoria_nombre = req.params.categoria_nombre;
  let query = categoria_nombre !='undefined' ? { categoria_nombre } : {}
  
  ModelProducto.find( query ).select('-imagen')
    .exec((err, items) => {

      if (err || !items) return errorHandler(items, next, err)
      
      return res.json({
        items: items
      })

    })

}




module.exports = {
  getProducto,
  guardar,
  getxId,
  borrar,
  update,
  imagen,
  listar_paginate1,
  listar_paginate2,
  getxCategoria
};
