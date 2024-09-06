const bcrypt = require("bcrypt");
const crypto = require("crypto");
const shopModel = require("../models/shop.model");
const KeyTokenService = require("./keyToken.service");
const { createTokenPair } = require("../auth/authUtils");
const { getInfoData } = require("../utils");
const { generateKeyPair } = require("../utils/keyToken.utils");
const { BadRequestError } = require("../core/error.response");

const roleShop = {
  SHOP: "SHOP",
  WRITER: "WRITER",
  EDITOR: "EDITOR",
  ADMIN: "ADMIN",
};
const SALT = 10;

const hashPassword = (password) => bcrypt.hash(password, SALT);

class AccessService {
  static signUp = async ({ name, email, password }) => {
    // step1: check email exists
    const holderShop = await shopModel.findOne({ email }).lean();
    if (holderShop) {
      throw new BadRequestError("Shop existed.");
    }

    const passwordHash = await hashPassword(password);
    const newShop = await shopModel.create({
      name,
      email,
      password: passwordHash,
      roles: [roleShop.SHOP],
    });
    if (newShop) {
      // create privateKey, publicKey
      const { privateKey, publicKey } = await generateKeyPair();

      const keyStore = await KeyTokenService.createKeyToken({
        userId: newShop._id,
        publicKey,
        privateKey,
      });

      if (!keyStore) {
        return {
          code: "xxxx",
          message: "Create key token fail.",
        };
      }

      const tokens = await createTokenPair({
        payload: {
          userId: newShop._id,
          email,
        },
        publicKey: publicKey,
        privateKey: privateKey,
      });

      return {
        code: 201,
        metadata: {
          shop: getInfoData({
            fields: ["_id", "name", "email"],
            object: newShop,
          }),
          tokens,
        },
      };
    }

    return {
      code: 200,
      metadata: null,
    };
  };
}

module.exports = AccessService;
