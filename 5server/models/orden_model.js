
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var schemaOrden = new Schema({
  usuario: {
    nombre: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  productos: [{
    producto: {
      type: Object,
      required: true
    },
    cantidad: {
      type: Number,
      required: true
    }
  }],
  total: {
    type: Number,
    required: true
  },
  fecha_orden: {
    type: Date,
    required: true,
    default : Date.now
  }
});

schemaOrden.methods.generarOrden = async function(docUsuario){

    docUsuario = await docUsuario
        .populate('cart.items.productId', '-stock -vendidos -imagen -disponible -createdAt -updatedAt');

    
    console.log(docUsuario);

    let total = 0;

    let producto = docUsuario.cart.items.map( item=> {
        console.log(item);
        total += item.cantidad * item.productId.precio;
        // total += item.total;

        return {
            producto : item.productId.toObject(),
            cantidad: item.cantidad
        }

    })

    let usuario = {
        nombre : docUsuario.nombre,
        email: docUsuario.email,
        userId: docUsuario._id
    }

    console.log(usuario);

    this.usuario = usuario;
    this.productos = producto;
    this.total = total;
    await this.save()
    await docUsuario.clearCarrito();
}

const model = mongoose.model('modelOrden',schemaOrden );

module.exports = model;