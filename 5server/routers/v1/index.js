const categoriaRouter = require("./categoria_router");
const productoRouter = require("./producto_router");
const loginRouter = require("./login_router");
const carroRouter = require("./carro_router");

module.exports = (app) => {
  app.use("/api/v1", categoriaRouter);
  app.use("/api/v1", productoRouter);
  app.use("/api/v1", loginRouter);
  app.use("/api/v1", carroRouter);
};
