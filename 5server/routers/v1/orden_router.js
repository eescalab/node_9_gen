const router = require('express').Router();
const { generarOrden,listarOrden  } = require('../../controller/orden_controller');

router.get('/orden/generar/:idUsuario', generarOrden );
router.get('/orden/listar/:idUsuario', listarOrden);

module.exports = router;