const { body, validationResult } = require("express-validator");
const ModelUsuario = require("../models/usuario_model");

let vSingUp = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    let err = new Error("Error en los campos");
    err.statusCode = 422;
    err.data = errors.array();
    return next(err); //throw err
  }
  next();
};

const paramSingUp = [
  body("email")
    .isEmail()
    .withMessage("Ingrese un email valido")
    .custom((value) => {
      return ModelUsuario.findOne({ email: value }).then((doc) => {
        if (doc) return Promise.reject("Este correo ya existe");
      });
    }),

  body("password")
    .isLength({ min: 6 })
    .withMessage("minimo 6 caracteres")
    .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$.!%*#?&])/)
    .withMessage("debe tener numeros, caraceres y @$.!%*#?&"),
];

const paramLogin = [
  body("password")
    .isLength({ min: 6 })
    .withMessage("minimo 6 caracteres")
    .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$.!%*#?&])/)
    .withMessage("debe tener numeros, caraceres y @$.!%*#?&"),
];

const validatorSingUp = [paramSingUp, vSingUp];
const validatorLogin = [paramLogin, vSingUp];

module.exports = {
  validatorSingUp,
  validatorLogin,
};
