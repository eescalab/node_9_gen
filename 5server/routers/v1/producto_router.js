const router = require('express').Router();

const { 
    getProducto,
    guardar, 
    getxId, 
    borrar,
    update,
    imagen
    } =  require('../../controller/producto_controller');

router.param('idProducto', getProducto )


router.post('/producto', guardar);
router.get('/producto/:idProducto', getxId);
router.delete('/producto/:idProducto', borrar);
router.put('/producto/:id', update);
router.get('/producto/imagen/:id', imagen)


module.exports = router;