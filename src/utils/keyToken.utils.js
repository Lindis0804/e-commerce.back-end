const { generateKeyPairSync } = require("crypto");
const { randomBytes } = require("node:crypto");

const generateKeyPair = async () => {
  return generateKeyPairWay1();
};

const generateKeyPairWay1 = async () => {
  const { privateKey, publicKey } = generateKeyPairSync("rsa", {
    modulusLength: 4096,
    publicKeyEncoding: {
      type: "pkcs1",
      format: "pem",
    },
    privateKeyEncoding: {
      type: "pkcs1",
      format: "pem",
    },
  });

  return {
    privateKey,
    publicKey,
  };
};

const generateKeyPairWay2 = async () => {
  const privateKey = randomBytes(64).toString("hex");
  const publicKey = randomBytes(64).toString("hex");
  return { privateKey, publicKey };
};

module.exports = { generateKeyPair };
