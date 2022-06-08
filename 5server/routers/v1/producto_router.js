const router = require('express').Router();

const { 
    getProducto,
    guardar, 
    getxId, 
    borrar,
    update,
    imagen,
    listar_paginate1,
    listar_paginate2,
} =  require('../../controller/producto_controller');

router.param('idProducto', getProducto )


router.post('/producto', guardar);
router.get('/producto/get/:idProducto', getxId);
router.delete('/producto/:idProducto', borrar);
router.put('/producto/:id', update);
router.get('/producto/imagen/:idx', imagen)
router.get('/producto/paginate1/', listar_paginate1)
router.get('/producto/paginate2/', listar_paginate2)

module.exports = router;