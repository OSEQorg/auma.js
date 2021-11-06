const path = require("path");

const webpack = require("webpack");

module.exports = function config(env) {
  const vueCdnUrl = {
    development: "https://unpkg.com/vue@3.2.8/dist/vue.global.js",
    production: "https://unpkg.com/vue@3.2.8/dist/vue.global.prod.js",
  }[env.mode];

  const outDir = {
    development: path.resolve(__dirname, `demo/${env.app}/dist`),
    production: path.resolve(__dirname, "dist"),
  }[env.mode];

  return {
    mode: env.mode,
    entry: `./src/${env.app}/app.js`,
    output: {
      filename: `auma-${env.app}.js`,
      path: outDir,
    },
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"],
        },
      ],
    },
    plugins: [
      new webpack.DefinePlugin({
        VUE_CDN_URL: JSON.stringify(vueCdnUrl),
      }),
    ],
  };
};
