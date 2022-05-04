const data = [
    {
        id:123,
        nombre: "admin"
    },
    {
        id:124,
        nombre: "tecnico"
    }
]

//=====
// Listar Usuarios
//======
function listar(req, res){

    res.json({
        data:data
    })
}


//=====
// Get Usuario
//======
//localhost:8080/usuario/123
let get = (req,res) => {
    let id = req.params.id
    res.json({
        data: data.filter(item => item.id == id )
    })
}

//=====
// Guardar Usuario
//======
function guardar(req, res){

    data.push(req.body);
    res.json({
        data:data
    })

}

//=====
// Borrar Usuario
//======

function borrar(req, res){
    
    let id = req.params.id;
    res.json({
        data: data.filter(item => item.id = id)
    })
}

module.exports = {
    listar,
    get,
    guardar,
    borrar
}