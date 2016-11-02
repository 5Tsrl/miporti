const path = require("path");
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin")

const isProd = (process.env.NODE_ENV === 'production')

// Conditionally return a list of plugins to use based on the current environment.
// Repeat this pattern for any other config key (ie: loaders, etc).
function getPlugins() {
  let plugins = []

  // Always expose NODE_ENV to webpack, you can now use `process.env.NODE_ENV`
  // inside your code for any environment checks; UglifyJS will automatically
  // drop any unreachable code.
  plugins.push(new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': process.env.NODE_ENV
      //'NODE_ENV': JSON.stringify('production')
    }
  }))

  plugins.push(new ExtractTextPlugin("style.css", {allChunks: true}))
    
    
  // Conditionally add plugins for Production builds.
  if (isProd) {
    //console.log('isProd è', isProd)
    plugins.push(new webpack.optimize.DedupePlugin()),
    plugins.push(new webpack.optimize.UglifyJsPlugin())
  }

  // Conditionally add plugins for Development
  else {
    plugins.push(new webpack.HotModuleReplacementPlugin())
  }

  return plugins
}

function getEntries() {
  let entries = []
  //always
  entries.push('babel-polyfill')
  entries.push(PATHS.app + '/index')
  if (!isProd) {
    entries.push('webpack-dev-server/client?http://0.0.0.0:8080')   // WebpackDevServer host and port
    entries.push('webpack/hot/only-dev-server')             // "only" prevents reload on syntax errors
  }
  
  return entries
}

const PATHS = {
  app: path.join(__dirname, 'app'),
  build: path.join(__dirname, 'build')
};

module.exports = {
    entry: getEntries(),
    /* [
      //'webpack-dev-server/client?http://0.0.0.0:8080', // WebpackDevServer host and port
      //'webpack/hot/only-dev-server', // "only" prevents reload on syntax errors
      PATHS.app + '/index'
    ],*/
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    output: {
        path: PATHS.build,
        filename: "bundle.js",
    },
    //devtool: '#source-map',
    devtool: '#cheap-module-source-map',
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
    },
    plugins:  getPlugins()
    /*[
        new ExtractTextPlugin("style.css", {allChunks: true}),
        new webpack.HotModuleReplacementPlugin()
    ]*/
}
