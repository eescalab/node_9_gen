

//MODULO EXPRESS

const express = require("express");

const app = express();

app.get('/', (req,res)  => {

    res.json(
        {
            estado: true,
            producto: "Polo"
        }
    )

})

app.get('/usuarios', (req,res)  => {

    res.json(
        {
            estado: true,
            producto: "usuarios"
        }
    )

})



app.listen(8080 , ()=> {

    console.log('Server Ok 8080');
})

