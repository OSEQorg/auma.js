const path = require("path");

const webpack = require("webpack");

function checkEnv(value, allowedValues, name) {
  if (!allowedValues.includes(value)) {
    throw new Error(`unrecognized ${name}`);
  }
}

module.exports = function config(env) {
  checkEnv(env.mode, ["development", "production"], "env.mode");
  checkEnv(env.out, ["dist", "demo"], "env.out");
  checkEnv(env.appType, ["survey"], "env.appType");

  const vueCdnUrl = {
    development: "https://unpkg.com/vue@3.2.8/dist/vue.global.js",
    production: "https://unpkg.com/vue@3.2.8/dist/vue.global.prod.js",
  }[env.mode];

  const outDir = {
    demo: path.resolve(__dirname, `demo/${env.appType}/dist`),
    dist: path.resolve(__dirname, "dist"),
  }[env.out];

  return {
    mode: env.mode,
    entry: `./src/${env.appType}/main.js`,
    output: {
      filename: `auma-${env.appType}.js`,
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
