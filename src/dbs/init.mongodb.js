const mongoose = require("mongoose");
require("dotenv");
const {
  db: {
    host: dbHost,
    port: dbPort,
    name: dbName,
    username: dbUsername,
    password: dbPassword,
  },
} = require("../configs/config.mongodb");
const connectString = `mongodb://${dbUsername}:${dbPassword}@${dbHost}:${dbPort}/${dbName}?authSource=admin`;
const { countConnection } = require("../helpers/check.connect");

class Database {
  constructor() {
    this.connect();
  }

  connect(type = "mongodb") {
    if (1 === 1) {
      mongoose.set("debug", true);
      mongoose.set("debug", { color: true });
    }

    mongoose
      .connect(connectString, {
        maxPoolSize: 50,
      })
      .then((_) =>
        console.log(`PRO-Connect mongodb successfully,`, countConnection())
      )
      .catch((err) => console.log(`Error connect!: ${JSON.stringify(err)}`));
  }

  static getInstance() {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }
}

const instanceMongodb = Database.getInstance();
module.exports = instanceMongodb;
