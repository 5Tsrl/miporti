const path = require("path");
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const PATHS = {
  app: path.join(__dirname, 'app'),
  build: path.join(__dirname, 'build')
};

module.exports = {
    entry: ['babel-polyfill',path.join(__dirname, 'app')],
    /*{
       app: PATHS.app
    },*/
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    output: {
        //path: path.resolve(__dirname, "build"),
        path: PATHS.build,
        //publicPath: "/home/",
        filename: "bundle.js",
        //sourceMapFilename: "./build/bundle.map"
    },
    devtool: '#source-map',
    module: {
        loaders: [
          {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract("style",[ "css?sourceMap", "sass?sourceMap"])
          },
          {     test: /\.jpe?g$|\.gif$|\.png$|\.svg$|\.m4v$/,
                //include: 'images',
                loader: 'url?limit=25000&name=images/[name].[ext]'
                //loader: "file?name=images/[name].[hash].[ext]",
                //loader: "file?name=images/[name].[ext]",
          },
          {
                test: /\.(eot|ttf|woff|woff2)$/,
                loader : 'file?name=font/[name].[ext]'
          },           
          {
            test: /\.jsx?$/,
            loader: 'babel',
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
      //hot: true,
      inline: true,
      progress: true,

      // Display only errors to reduce the amount of output.
      //stats: 'errors-only',

      // Parse host and port from env so this is easy to customize.
      //
      // If you use Vagrant or Cloud9, set
       host: process.env.HOST || '0.0.0.0',
      //
      // 0.0.0.0 is available to all network devices unlike default
      // localhost
      //host: process.env.HOST,
      //port: process.env.PORT
    },
    plugins: [
        new ExtractTextPlugin("style.css", {
            allChunks: true
        }),
        new webpack.HotModuleReplacementPlugin()
    ]
}
