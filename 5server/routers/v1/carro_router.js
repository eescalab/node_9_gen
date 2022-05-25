const router = require("express").Router();
const {addCarro, listarCarro} = require("../../controller/carro_controller")

//Rutas
router.post('/carro/add', addCarro );
router.get('/carro/:idUsuario', listarCarro );

module.exports = router;