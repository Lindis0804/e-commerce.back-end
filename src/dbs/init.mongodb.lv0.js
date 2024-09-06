"use strict";

const mongoose = require("mongoose");

const username = 1;
const password = 1;
const dbUrl = "localhost:27017";
const connectString = `mongodb://${dbUrl}/shopDEV`;

console.log(connectString);
mongoose
  .connect(connectString)
  .then((_) => console.log(`Connected Mongodb Successfully`))
  .catch((err) => console.log("Error connect.", JSON.stringify(err)));

module.exports = mongoose;
