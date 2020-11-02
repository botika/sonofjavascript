const path = require("path");

module.exports = {
  plugins: [
    "syntax-dynamic-import",
    "@babel/plugin-transform-runtime",
    [
      "module-resolver",
      {
        root: ["./src"],
        alias: {
          api: path.resolve(__dirname, "src/api"),
          app: path.resolve(__dirname, "src/app"),
          img: path.resolve(__dirname, "src/img"),
          mocks: path.resolve(__dirname, "config/mocks"),
          store: path.resolve(__dirname, "src/store"),
        },
      },
    ],
  ],
  presets: ["@babel/preset-env", "@babel/preset-react", "@babel/preset-flow"],
  env: {
    e2e: {
      plugins: ["istanbul"],
    },
  },
};
