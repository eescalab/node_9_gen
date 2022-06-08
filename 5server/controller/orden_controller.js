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

module.exports = {
    generarOrden
}