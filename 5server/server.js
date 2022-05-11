//Module core
const http = require('http');

//Module npm
const mongoose = require('mongoose');
//Modulos propios
const app = require('./config/app')



const server = http.createServer(app);

 
    
//"mongoose": "^5.12.2"
mongoose.connect('mongodb://localhost:27017/node9Gen').then(  ()=>{
    console.log('Mongo Ok');

    server.listen('3000', () => {
        console.log('Server Up port 3000');
    })
})
