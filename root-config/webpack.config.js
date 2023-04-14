const { merge } = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa-ts");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const miniCssExtractPlugin = require('mini-css-extract-plugin')
const ExposeRuntimeCssAssetsPlugin = require("single-spa-css/ExposeRuntimeCssAssetsPlugin.cjs");

module.exports = (webpackConfigEnv, argv) => {
  const orgName = "app";
  const defaultConfig = singleSpaDefaults({
    orgName,
    projectName: "root-config",
    webpackConfigEnv,
    argv,
    disableHtmlGeneration: true
  });

  // console.log(defaultConfig);

  return merge(defaultConfig, {
    // modify the webpack config however you'd like to by adding to this object
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"],
        },
        {
          test: /\.(png|jpe?g|gif|svg)$/i,
          loader: 'file-loader',
          options: {
            name: '[path][name].[ext]',
          },
        },
        {
          test: /\.(svg|gif|ico|eot|ttf|woff2?)(\?v=\d+\.\d+\.\d+)?$/i,
          type: 'asset/resource',
        }
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        inject: false,
        template: "src/index.ejs",
        templateParameters: {
          isLocal: webpackConfigEnv && webpackConfigEnv.isLocal,
          orgName,
        },
      }),
      // new miniCssExtractPlugin()
    ],
  });
};
