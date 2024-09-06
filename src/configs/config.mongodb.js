"use strict";
require("dotenv").config();
const dev = {
  app: {
    port: process.env.DEV_APP_PORT || 3000,
  },
  db: {
    host: process.env.DEV_DB_HOST || "localhost",
    port: process.env.DEV_DB_PORT || 27017,
    name: process.env.DEV_DB_NAME || "shopDEV",
    username: process.env.DEV_DB_USERNAME || "1",
    password: process.env.DEV_DB_PASSWORD || "1",
  },
};

const prod = {
  app: {
    port: process.env.PROD_APP_PORT || 3000,
  },
  db: {
    host: process.env.PROD_DB_HOST || "localhost",
    port: process.env.PROD_DB_PORT || 27017,
    name: process.env.PROD_DB_NAME || "shopPROD",
    username: process.env.PROD_DB_USERNAME || "1",
    password: process.env.PROD_DB_PASSWORD || "1",
  },
};

const config = { dev, prod };
const env = process.env.NODE_ENV || "dev";
module.exports = config[env];
