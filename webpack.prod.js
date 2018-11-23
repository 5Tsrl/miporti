const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

module.exports = merge(common, {
  mode: 'production',
  devtool: 'source-map',
  plugins: [
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "[name].css",
      chunkFilename: "[id].css"
    })
  ],
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          //'postcss-loader',
          'sass-loader',
        ],
      },
    ]
  }
});
