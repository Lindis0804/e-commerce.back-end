const accessController = require("../../controllers/access.controller");

const router = require("express").Router();
const { asyncHandler } = require("../../auth/checkAuth");

router.get("", accessController.welcome);

router.post("/shop/signup", asyncHandler(accessController.signUp));

module.exports = router;
