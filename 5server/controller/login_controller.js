const bcrypt = require("bcrypt");
const ModelUsuario = require("../models/usuario_model");
const { util_handler } = require("../middlewares/middleware_error");

function singup(req, res, next) {
  console.log(req.body);

  const salt = bcrypt.genSaltSync();
  console.log("salt:", salt);

  let data = {
    nombre: req.body.nombre,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, salt),
    role: req.body.role,
  };

  let docUsuario = ModelUsuario(data);
  docUsuario.save((err, doc) => {
    if (err) return util_handler(doc, next, err);

    res.json({
      doc,
    });
  });
}

function login(req, res, next) {
  let email = req.body.email;
  let password = req.body.password;

  ModelUsuario.findOne({ email: email }, (err, doc) => {
    if (err) return util_handler(doc, next, err);

    if (!bcrypt.compareSync(password, doc.password)) {
      let error = new Error("usuario o password incorrecto");
      error.statusCode = 404;
      return next(error);
    }

    return res.json({
      usuario: {
        usuarioId: doc._id,
        nombre: doc.nombre,
        role: doc.role,
      },
    });
  });
}

module.exports = {
  singup,
  login,
};
