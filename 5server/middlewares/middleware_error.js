

function util_handler(data, next, err = null){
    if(err){
        
        return next(err);
    }

    if(!data){
        let error = new Error('No encontrado !');
        error.statusCode = 404;
        return next(error);
    }
}

function handler(err, req, res, next)  {

    console.log(err);
    const status = err.statusCode || 500;
    const message = err.message;
    const data = err.data;

    res.status(status).json({
        message,
        data
    })

}

module.exports = {
    handler,
    util_handler
}