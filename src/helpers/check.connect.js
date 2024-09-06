"use strict";

const mongoose = require("mongoose");
const os = require("os");
const process = require("process");
const _SECONDS = 5000;
const _MAX_CONNECTION_PER_CORES = 5;
const countConnection = () => {
  const numOfConnection = mongoose.connections.length;
  console.log(`Number of connections::${numOfConnection}`);
};

const checkOverload = () => {
  setInterval(() => {
    const numConnection = mongoose.connections.length;
    const numCores = os.cpus().length;
    const memoryUsage = process.memoryUsage().rss;

    const maxConnections = numCores * _MAX_CONNECTION_PER_CORES;

    console.log(`Active connections:: ${numConnection}`);
    console.log(`Memory usage:: ${memoryUsage / 1024 / 1024} MB`);
    console.log(`Num of cores: ${numCores}`);
    if (numConnection > maxConnections) {
      console.log(`Connection overload detected!`);
    }
  }, _SECONDS);
};
module.exports = {
  countConnection,
  checkOverload,
};
