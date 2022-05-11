const router = require('express').Router();

const {
    guardar,
    listar,
    actualizar
} = require('../../controller/categoria_controller');


router.post('/categoria',guardar);
router.get('/categoria',listar);
router.put('/categoria/:id', actualizar)

module.exports = router;