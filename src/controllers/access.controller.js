const { CREATED } = require("../core/success.response");
const AccessService = require("../services/access.service");

class AccessController {
  signUp = async (req, res, next) => {
    return new CREATED({
      metadata: await AccessService.signUp(req.body),
      message: "Registed OK!",
    }).send(res);
  };
  welcome = (req, res, next) => {
    return res.status(200).json({
      message: "Welcome to shopping mall",
    });
  };
}

module.exports = new AccessController();
