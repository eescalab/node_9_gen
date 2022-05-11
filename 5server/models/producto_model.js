const ModelCategoria = require('./categoria_model');

const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const validator_categoria = (val) => {
  let rpta = ModelCategoria.exists(
    {categoria_nombre : val }
  )
  return rpta;
}


const schemaProducto = new Schema({

  producto_nombre: {
    type: String,
    required: true
  },
  descripcion: {
    type: String
  },
  precio: {
    type: Number,
    required: true
  },
  stock: {
    type: Number,
    required: true
  },
  vendidos: {
    type: Number,
    default: 0
  },
  disponible: {
    type: Boolean,
    default: true
  },
  categoria_nombre: {
    type: String,
    required: true,
    validate : validator_categoria
  },
  imagen: {
    type: Buffer,
    contentType: String
   }
}, {
  timestamps: true
});


const model = mongoose.model('modelProducto', schemaProducto );

module.exports = model;

