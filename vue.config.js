const path = require("path");

module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        "@": path.join(__dirname, "/src/frontend"),
      },
    },
  },
  outputDir: "dist/public",
  pages: {
    index: {
      entry: "src/frontend/main.js",
      template: "src/frontend/public/index.html",
    },
  },
};
