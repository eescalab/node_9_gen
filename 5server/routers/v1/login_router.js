const { validatorSingUp, validatorLogin } = require("../../validators/vlogin");
const { singup, login } = require("../../controller/login_controller");

const router = require("express").Router();

router.post("/singup", validatorSingUp, singup);

router.post("/login", validatorLogin, login);

module.exports = router;
