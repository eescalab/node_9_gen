const { validatorSingUp, validatorLogin } = require("../../validators/vlogin");
const { singup, login } = require("../../controller/login_controller");
const { isAuth, renewToken } = require("../../middlewares/middleware_auth")

const router = require("express").Router();

router.post("/singup", validatorSingUp, singup);

router.post("/login", validatorLogin, login);

router.get("/token/renew",
    isAuth,
    renewToken
)

module.exports = router;


//Header [Authorization = token ]
// GET ->localhost:3000/api/v1/token/renew 