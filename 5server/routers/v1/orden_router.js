const router = require('express').Router();
const { generarOrden } = require('../../controller/orden_controller');

router.get('/orden/generar/:idUsuario', generarOrden );


module.exports = router;