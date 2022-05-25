var jwt = require("jsonwebtoken");

//[ADMIN_ROLE, USER_ROLE ...... ]
roleAuth = (roles) => {
  try {
    return (req, res, next) => {
      let token = req.get("Authorization");
      var payload = jwt.verify(token, process.env.TOKEN_KEY);

      // {
      //   "usuarioId": "6286d7e81dfadf24a4587b19",
      //   "role": "ADMIN_ROLE",
      //   "iat": 1653006873,
      //   "exp": 1653010473
      // }

      if (roles.indexOf(payload.role) > -1) {
        // req.usuario = payload;
        return next();
      }

      throw new Error("Usuario o Rol no Autorizado");
    };
  } catch (error) {
    let err = new Error("Error de Token");
    err.data = error;
    err.statusCode = 401;
    next(err);
  }
};

isAuth = (req, res, next) => {
  let token = req.get("Authorization");

  jwt.verify(token, process.env.TOKEN_KEY, (err, decoded) => {
    if (err) return next(err);

    console.log("decoded", decoded);
    req.decoded = decoded;

    next();
  });
};

renewToken = (req, res, next) => {
  // let { iat, exp, ...payload } = req.decoded;

  let payload = {
    usuarioId: req.decoded.usuarioId,
    role: req.decoded.role
  }

  console.log('new payload', payload);

  let token = jwt.sign(payload, process.env.TOKEN_KEY, {
    expiresIn: process.env.CADUCIDAD_TOKEN,
  });

  res.json({token})

};

module.exports = {
  roleAuth,
  isAuth,
  renewToken
};
