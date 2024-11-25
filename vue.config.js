const fs = require("fs");
const path = require("path");
module.exports = {
  assetsDir: "static",
  parallel: false,
  publicPath: "./",
  // devServer: {
  //   https: {
  //     key: fs.readFileSync(path.resolve(__dirname, "server.key")),
  //     cert: fs.readFileSync(path.resolve(__dirname, "server.crt")),
  //   },
  //   port: 8080,
  // },
};
