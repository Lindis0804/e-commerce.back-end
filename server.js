const app = require("./src/app");
require("dotenv").config();
const {
  app: { port: PORT },
} = require("./src/configs/config.mongodb");

const server = app.listen(PORT, () => {
  console.log(`WSV eCommerce start with ${PORT}`);
});

// process.on("SIGNINT", () => {
//   server.close(() => console.log("Exit express server"));
// });
