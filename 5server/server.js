//Module core
const http = require("http");

//Module npm
const mongoose = require("mongoose");
require("dotenv").config();

//Express
const app = require("./config/app");
const server = http.createServer(app);

// console.log(process.env);
// console.log(process.env.CADUCIDAD_TOKEN);

//"mongoose": "^5.12.2"
mongoose.connect("mongodb://127.0.0.1:27017/node9Gen").then(() => {
  console.log("Mongo Ok");

  server.listen("3000", () => {
    console.log("Server Up port 3000");
  });
});
