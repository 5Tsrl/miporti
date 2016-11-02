const path = require("path");
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");


const PATHS = {
  app: path.join(__dirname, 'app'),
  build: path.join(__dirname, 'build')
};

module.exports = {
    entry: [
      'webpack-dev-server/client?http://0.0.0.0:8080', // WebpackDevServer host and port
      'webpack/hot/only-dev-server', // "only" prevents reload on syntax errors
      PATHS.app + '/index'
     ],
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    output: {
        path: PATHS.build,
        filename: "bundle.js",
    },
    devtool: '#source-map',
    module: {
        loaders: [
          {
                test: /index\.html/,
                loader: "file?name=[name].[ext]",
          },
          {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract("style",[ "css?sourceMap", "sass?sourceMap"])
          },
          {     test: /\.(jpe?g|gif|png|svg|m4v)$/,
                include: PATHS.app + '/images',
                loader: 'url?limit=25000&name=images/[name].[ext]'
                //loader: "file?name=images/[name].[hash].[ext]",
          },
          {
                test: /\.(eot|ttf|woff|woff2|svg)$/,
                include: PATHS.app + '/font',
                loader : 'file?name=font/[name].[ext]'
          },           
          {
                test: /\.jsx?$/,
                loader: 'babel',
                //loaders: ['react-hot', 'babel'],
                //loader: 'react-hot!babel',
                include: path.join(__dirname, 'app'),
                exclude: /node_modules/
           }
        ]
    },
    devServer: {
      contentBase: 'build/',

      // Enable history API fallback so HTML5 History API based
      // routing works. This is a good default that will come
      // in handy in more complicated setups.
      historyApiFallback: true,
      //hot: true,  //già presente ndel package.json
      //inline: true,
      progress: true,

      // Display only errors to reduce the amount of output.
      //stats: 'errors-only',

      // Parse host and port from env so this is easy to customize.
      //
      // If you use Vagrant or Cloud9, set
       //host: process.env.HOST || '0.0.0.0',
      //
      // 0.0.0.0 is available to all network devices unlike default
      // localhost
      //host: process.env.HOST,
      //port: process.env.PORT
    },
    plugins: [
        new ExtractTextPlugin("style.css", {allChunks: true}),
        new webpack.HotModuleReplacementPlugin()
    ]
}
