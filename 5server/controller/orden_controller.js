const ModelUsuario = require('../models/usuario_model');
const ModelOrden = require('../models/orden_model');

const generarOrden = async (req, res, next) => {
    try {

        let idUsuario = req.params.idUsuario;

        let docUsuario = await ModelUsuario.findById(idUsuario).exec();

        let docOrden = new ModelOrden()

        await docOrden.generarOrden(docUsuario);

        return res.json({
            docOrden
        })
        
    } catch (error) {
        return next(error);
    }
}

const listarOrden = async (req, res, next) => {

    let idUsuario = req.params.idUsuario;
    console.log('idUsuario:', idUsuario);
    
  
    try {
      let docOrden = await ModelOrden.find({ 'usuario.userId': idUsuario }, '-productos.producto.imagen').exec();
  
      console.log('docOrden:', docOrden);
      
      res.json(docOrden);
  
    } catch (error) {
      next(error);
    }
  
  
  
  }


module.exports = {
    generarOrden,
    listarOrden
}