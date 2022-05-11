

const categoriaRouter = require('./categoria_router');

module.exports = (app) => {
    app.use('/api/v1', categoriaRouter)
    
}