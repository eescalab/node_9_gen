const ModelCategoria = require('../models/categoria_model');

//==========
//	Guardar Categoria
//==========
function guardar(req, res){
    //Cuerpo metodo Post 
    
    console.log(req.body);

    let data = {
        categoria_nombre : req.body.categoria_nombre
    }

    let documento = ModelCategoria(data);

    documento.save( (err, doc) => {

        console.log(object);
        return res.json({
            data : doc
        })
    
    });

    

}

module.exports = {
    guardar
}