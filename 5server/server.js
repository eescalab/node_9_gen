//Module core
const http = require("http");

//Module npm
const mongoose = require("mongoose");

//Variables de entorno
console.log(process.env.NODE_ENV);
if(process.env.NODE_ENV==='dev'){
  require("dotenv").config({path: `${__dirname}/.env.dev`});

}else if(process.env.NODE_ENV==='prod'){
  require("dotenv").config({path: `${__dirname}/.env.prod`});
}

//Express
const app = require("./config/app");
const server = http.createServer(app);

// console.log(process.env);
// console.log(process.env.CADUCIDAD_TOKEN);

//"mongoose": "^5.12.2"
console.log(process.env.MONGO_URL);
mongoose.connect(process.env.MONGO_URL).then(() => {
  console.log("Mongo Ok");

  server.listen(process.env.PORT, () => {
    console.log("Server Up port 3000");
  });
});
