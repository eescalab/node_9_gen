const ModelUsuario = require("../models/usuario_model");
const ModelProducto = require("../models/producto_model");

addCarro = async (req, res, next) => {
  let productoId = req.body.productoId;
  let usuarioId = req.body.usuarioId;

  try {
    docProducto = await ModelProducto.findById(productoId).exec();
		if(!docProducto) {
			let err = new Error("No Existe")
			err.statusCode = 404;
			throw(err)
		}

		docUsuario = await ModelUsuario.findById(usuarioId).exec()

		let cantidad = 1;
		let items = [
			{
				productId : docProducto._id,
				cantidad,
				total: cantidad * docProducto.precio
			}
		]
		docUsuario.cart.items = items;
		await docUsuario.save();
		return res.json({docUsuario})

  } catch(err) {

		next(err);

	}
};


listarCarro = (req, res, next) => {

	let idUsuario = req.params.idUsuario;
	ModelUsuario.findById(idUsuario)
		.populate('cart.items.productId').exec( (err, doc) => {
			if(err) return next(err);

			return res.json({doc})
		} )
}

module.exports = {
	addCarro,
	listarCarro
}