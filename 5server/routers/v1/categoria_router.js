const router = require('express').Router();

const {
    guardar
} = require('../../controller/categoria_controller');


router.post('/categoria',guardar);

module.exports = router;