const ModelCategoria = require('./categoria_model');
const mongoosePaginate = require('mongoose-paginate-v2');
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
    required: true
  },
  imagen: {
    data: Buffer,
    contentType: String
   }
}, {
  timestamps: true
});

schemaProducto.path('categoria_nombre').validate(
  {
    validator: validator_categoria,
    message: 'Categoria no Existe ! v3'
  }
)

schemaProducto.methods.toJSON = function(){
  let obj = this.toObject();
  delete obj.imagen;
  return obj;
}

schemaProducto.plugin(mongoosePaginate);


const model = mongoose.model('modelProducto', schemaProducto );

module.exports = model;

