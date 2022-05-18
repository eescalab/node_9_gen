const { singup, login } = require("../../controller/login_controller");

const router = require("express").Router();

router.post("/singup", singup);
router.post("/login", login);

module.exports = router;
