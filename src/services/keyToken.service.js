const keyTokenModel = require("../models/keyToken.model");

class KeyTokenService {
  static createKeyToken = async ({ userId, publicKey, privateKey }) => {
    try {
      const publicKeyString = publicKey.toString();
      const privateKeyString = privateKey.toString();

      const token = await keyTokenModel.create({
        user: userId,
        publicKey: publicKeyString,
        privateKey: privateKeyString,
      });

      return token ? { publicKeyString, privateKeyString } : null;
    } catch (err) {
      return err;
    }
  };
}

module.exports = KeyTokenService;
