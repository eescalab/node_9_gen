const ModelUsuario = require("../models/usuario_model");
const { util_handler } = require("../middlewares/middleware_error");

function singup(req, res, next) {
  console.log(req.body);


  let data = {
    nombre: req.body.nombre,
    email: req.body.email,
    password: req.body.password,
    role: req.body.role,
  };

  let docUsuario = ModelUsuario(data);
  docUsuario.save((err, doc) => {
    if (err) return util_handler(doc, next, err);

     //TODO Borrar
     var token = docUsuario.getToken();

    res.json({
      usuario: {
        usuarioId: docUsuario._id,
        nombre: docUsuario.nombre,
        role: docUsuario.role,
      },
      token: token,
    });
  });
}

function login(req, res, next) {
  let email = req.body.email;
  let password = req.body.password;
  
  ModelUsuario.findOne({ email: email }, (err, docUsuario) => {
    if (err || !docUsuario ) return util_handler(docUsuario, next, err);

    console.log('docUsuario',docUsuario);
    console.log('password',password);
    if (!docUsuario.isValidPassword(password)) {
      let error = new Error("usuario o password incorrecto");
      error.statusCode = 404;
      return next(error);
    }


    var token = docUsuario.getToken();

    return res.json({
      usuario: {
        usuarioId: docUsuario._id,
        nombre: docUsuario.nombre,
        role: docUsuario.role,
      },
      token,
    });
  });
}

module.exports = {
  singup,
  login,
};
