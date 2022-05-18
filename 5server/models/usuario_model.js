var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var schemaUsuario = new Schema({
  nombre: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "USER_ROLE",
  },
  disponible: {
    type: Boolean,
    default: true,
  },
  cart: {
    items: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "Product",
        },
        cantidad: {
          type: Number,
          required: true,
        },
        total: {
          type: Number,
          required: true,
        },
      },
    ],
  },
});

const model = mongoose.model("modelUsuario", schemaUsuario);

module.exports = model;
