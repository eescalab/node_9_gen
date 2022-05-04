const usuarioRouter = require('./usuario_router.js');


module.exports = (app) => {
    app.use('/api/v1', usuarioRouter);
    
}