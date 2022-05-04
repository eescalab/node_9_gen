const router = require('express').Router();

const {
    listar,
    get,
    guardar,
    borrar
} = require('../../controller/usuario')


router.get('/usuario' ,listar);
router.get('/usuario/:id', get);
router.post('/usuario', guardar);
router.delete('/usuario/:id', borrar);


module.exports = router;