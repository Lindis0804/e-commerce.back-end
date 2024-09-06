"use strict";

const apiKeyModel = require("../models/apikey.model");

const findApiKey = async (key) => {
  const objKey = await apiKeyModel.findOne({ key, status: true }).lean();
  return objKey;
};

module.exports = {
  findApiKey,
};
