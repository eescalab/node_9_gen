const router = require("express").Router();
const { roleAuth } = require("../../middlewares/middleware_auth");

const {
  guardar,
  listar,
  actualizar,
} = require("../../controller/categoria_controller");

router.post("/categoria", roleAuth(["ADMIN_ROLE"]), guardar);
router.get("/categoria", listar);
router.put("/categoria/:id", actualizar);

module.exports = router;
