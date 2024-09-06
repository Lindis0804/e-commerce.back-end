"use strict";

const express = require("express");
const router = express.Router();

const accessRouter = require("./access/index");
const { apiKey, permission } = require("../auth/checkAuth");

router.use(apiKey);
router.use(permission("0000"));
router.use("/v1/api", accessRouter);

module.exports = router;
