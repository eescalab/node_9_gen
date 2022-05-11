var mongoose = require('mongoose');

//Schema
var schemaCategoria = mongoose.Schema({

    categoria_nombre: {
        type: String,
        unique: true
    },
    status: {
        type: Boolean,
        default: true
    }

    },{
    timestamps: true
});


//Modelo
const model = mongoose.model('modelCategoria', schemaCategoria);

//exportando modelo 
module.exports = model;

//1 Schema
//2 Modelo
//3 Documento