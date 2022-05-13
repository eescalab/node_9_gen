const router = require('express').Router();

const { 
    getProducto,
    guardar, 
    getxId, 
    borrar,
    update
    } =  require('../../controller/producto_controller');

router.param('idProducto', getProducto )


router.post('/producto', guardar);
router.get('/producto/:idProducto', getxId);
router.delete('/producto/:idProducto', borrar);
router.put('/producto/:idProducto', update);

module.exports = router;