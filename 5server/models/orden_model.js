
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
schemaOrden.methods.generarOrden = async function( docUsuario) {

  let docUsuarioPopulate = await docUsuario
    .populate('cart.items.productId','-imagen -disponible -createdAt -updatedAt');

  let total = 0;


  let producto = docUsuarioPopulate.cart.items.map(itemProd =>{
    
    total += itemProd.cantidad * itemProd.productId._doc.precio;

    itemProd.productId.stock -= itemProd.cantidad;
    itemProd.productId.vendidos += itemProd.cantidad;
    itemProd.productId.save();

    let copy_obj = { ...itemProd.productId.toObject()};

    delete copy_obj.vendidos;
    delete copy_obj.stock;


    return {
      producto: copy_obj,
      cantidad: itemProd.cantidad
    }

  })

  let usuario = {
    nombre : docUsuarioPopulate.nombre,
    email: docUsuarioPopulate.email,
    userId: docUsuarioPopulate._id
}

  this.usuario = usuario;
  this.productos = producto;
  this.total = total;
  // docUsuario.cart = { items: [] };
  // await docUsuario.save();
  await docUsuario.clearCarrito();
  return this.save();


}


// schemaOrden.methods.generarOrden2 = async function(docUsuario){

//     docUsuario = await docUsuario
//         .populate('cart.items.productId', '-stock -vendidos -imagen -disponible -createdAt -updatedAt');

    
//     console.log(docUsuario);

//     let total = 0;

//     let producto = docUsuario.cart.items.map( item=> {
//         console.log(item);
//         total += item.cantidad * item.productId.precio;
//         // total += item.total;

//         return {
//             producto : item.productId.toObject(),
//             cantidad: item.cantidad
//         }

//     })

//     let usuario = {
//         nombre : docUsuario.nombre,
//         email: docUsuario.email,
//         userId: docUsuario._id
//     }

//     console.log(usuario);

//     this.usuario = usuario;
//     this.productos = producto;
//     this.total = total;
//     await this.save()
//     await docUsuario.clearCarrito();
// }

const model = mongoose.model('modelOrden',schemaOrden );

module.exports = model;