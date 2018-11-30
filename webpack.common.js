const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: __dirname + '/app/index.html',
  filename: 'index.html',
  inject: 'body',
})

module.exports = {
  entry: {
    app: './app/index.jsx',
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    HtmlWebpackPluginConfig,
  ],
  output: {
    filename: '[hash].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },

  module: {
    rules: [
      // {
      //   test: /\.(html|txt)$/,
      //   loader: "file-loader?name=[name].[ext]",
      // },
      {
        test: /\.html$/,
        loader: 'html-loader',
      },
      {
        test: /favicon\.ico/,
        use: 'file-loader?name=images/[name].[ext]',
      },
      {
        test: /\.(jpe?g|gif|png|svg|m4v)$/,
        include: path.resolve(__dirname, 'app/images'),
        use: 'url-loader?limit=10000&name=images/[name].[ext]',
      },
      {
        test: /\.(eot|ttf|woff|woff2|svg)$/,
        include: path.resolve(__dirname, 'app/font'),
        use: 'file-loader?name=font/[name].[ext]',
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
    ],
  },
}
