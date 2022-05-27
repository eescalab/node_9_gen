var mongoose = require("mongoose");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

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
          ref: "modelProducto",
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


schemaUsuario.methods.isValidPassword = function (password){
  // this = docUser 
  return bcrypt.compareSync(password, this.password);
}

schemaUsuario.methods.getToken = function (){
  
  let payload = {
    usuarioId: this._id,
    role: this.role,
  };
  
  var token = jwt.sign(payload, process.env.TOKEN_KEY, {
    expiresIn: process.env.CADUCIDAD_TOKEN,
  });

  return token
  
}


schemaUsuario.pre("save" , function(next) {

  if(this.isModified("password")){
    this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync());
    next();
  }

  next();

})


schemaUsuario.methods.addCarro = function(docProducto){

  let index = this.cart.items.findIndex( item => {
    return item.productId.toString() == docProducto._id.toString()
  } )

  console.log(index);

  let _cantidad = 1;
  let newCartItems = [ ...this.cart.items ];

  if(index >= 0 ){
    _cantidad = this.cart.items[index].cantidad +1;
    newCartItems[index].cantidad = _cantidad;
    newCartItems[index].total = _cantidad * docProducto.precio;
  }else{
    newCartItems.push({
      productId : docProducto._id,
      cantidad : _cantidad,
      total: _cantidad * docProducto.precio
    })
  }

  

  this.cart.items = newCartItems;
  return this.save();
		

}


schemaUsuario.virtual('cart.unidades').get( function() {

  let unidades = this.cart.items.reduce( (total, item) => {
    return total + item.cantidad;
  }, 0 )

  return unidades;
})

schemaUsuario.set('toJSON', {virtuals : true});

const model = mongoose.model("modelUsuario", schemaUsuario);

module.exports = model;
