const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin') // eslint-disable-line import/no-extraneous-dependencies
const HtmlWebpackPlugin = require('html-webpack-plugin') // eslint-disable-line import/no-extraneous-dependencies

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: `${__dirname}/app/index.html`,
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
    // filename: '[hash].bundle.js',
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },

  module: {
    rules: [
      {
        test: /\.txt$/,
        loader: 'file-loader?name=[name].[ext]', // robots.txt, sitemap.txt
      },
      {
        test: /\.html$/,
        loader: 'html-loader',
      },
      {
        test: /favicon\.ico/,
        use: 'file-loader?name=images/[name].[ext]',
      },
      {
        test: /\.ya?ml$/,
        use: 'js-yaml-loader',
      },
      {
        test: /\.svg$/,
        include: path.resolve(__dirname, 'app/images/meteo'),
        loader: 'svg-url-loader',
        options: {
          // Inline files smaller than 10 kB (10240 bytes)
          limit: 10 * 1024,
          // Remove the quotes from the url
          // (they’re unnecessary in most cases)
          noquotes: true,
        },
        // use: 'svg-url-loader?limit=10000&name=images/[name].[ext]',
      },
      {
        test: /\.svg$/,
        exclude: path.resolve(__dirname, 'app/images/meteo'),
        // issuer: {
        //   test: /\.js$/,
        // },
        use: [
          { loader: '@svgr/webpack' },
          // {
          //   loader: 'svg-url-loader',
          //   options: {
          //     // Inline files smaller than 10 kB (10240 bytes)
          //     limit: 10 * 1024,
          //     // Remove the quotes from the url
          //     // (they’re unnecessary in most cases)
          //     noquotes: true,
          //   },
          // },
        ],
      },
      {
        test: /\.(jpe?g|gif|png|webp|m4v)$/,
        include: path.resolve(__dirname, 'app/images'),
        use: 'url-loader?limit=5000&name=images/[name].[ext]',
      },
      // {
      //   test: /\.(eot|ttf|woff|woff2|svg)$/,
      //   include: path.resolve(__dirname, 'app/font'),
      //   use: 'file-loader?name=font/[name].[ext]',
      // },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
    ],
  },
}
