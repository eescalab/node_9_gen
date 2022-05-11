const router = require('express').Router();

const { guardar } =  require('../../controller/producto_controller');

router.post('/producto', guardar);


module.exports = router;