const router = require("express").Router();
const { roleAuth } = require("../../middlewares/middleware_auth");

const {
  guardar,
  listar,
  actualizar,
} = require("../../controller/categoria_controller");


/**
 * @swagger
 * /categoria:
 *   post:
 *     summary: Crear Categoria
 *     tags: [Category]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Category"
 *     responses:
 *       200: 
 *         description: ok
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Category"
 *       500:
 *         description: jwt expired     
 */

router.post("/categoria", 
// roleAuth(["ADMIN_ROLE"]), 
guardar);

router.get("/categoria", listar);
router.put("/categoria/:id", actualizar);



/**
 * @swagger
 * components:
 *   schemas:
 *     Category:
 *       type: object
 *       required:
 *         - categoria_nombre
 *       properties:
 *         categoria_nombre:
 *            type: string
 *         status:
 *            type: boolean
 *            default: true
 *       example:
 *         categoria_nombre: Blusas Naranjas
 *         status: true      
 */



module.exports = router;
