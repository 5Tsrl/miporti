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
  console.log('process.env.NODE_ENV',process.env.NODE_ENV)

  plugins.push(new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
      //'NODE_ENV': JSON.stringify('production')
    }
  }))

  plugins.push(new ExtractTextPlugin("style.css"))

  //require only desired moment locales
  plugins.push(new webpack.ContextReplacementPlugin(/moment[\\\/]locale$/, /^\.\/(en|it)$/))

  // Conditionally add plugins for Production builds.
  if (isProd) {
    //console.log('isProd è', isProd)
    plugins.push(new webpack.optimize.UglifyJsPlugin({compress: {warnings: false}, sourceMap: false}))
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
  entries.push(PATHS.app + '/index.jsx')
  entries.push(PATHS.app + '/test1.html')
  if (!isProd) {
    entries.push('webpack-dev-server/client?http://0.0.0.0:8080')   // WebpackDevServer host and port
    entries.push('webpack/hot/only-dev-server')             // "only" prevents reload on syntax errors
  }
  return entries
}

function getDevtool(){
  //devtool: '#cheap-module-source-map': 2 sec meno, ma no debug su jsx...,  '#source-map'
  if(!isProd) return '#source-map'
  return ''
}


const PATHS = {
  app: path.join(__dirname, 'app'),
  build: path.join(__dirname, 'build')
};

module.exports = {
    entry: getEntries(),
    resolve: {
        extensions: ['*', '.js', '.jsx']
    },
    output: {
        path: PATHS.build,
        filename: "bundle.js",
    },

    devtool: getDevtool(),

    module: {
        rules: [
          {
                test: /\.(html|txt)$/,
                include: PATHS.app,
                loader: "file-loader?name=[name].[ext]",
          },
          {
                test: /favicon\.ico/,
                use: "file-loader?name=images/[name].[ext]",
          },
          {
                test: /\.scss$/,
                //loader: ExtractTextPlugin.extract("style",[ "css?sourceMap", "sass?sourceMap"])
                use: ExtractTextPlugin.extract({ fallback: 'style-loader', use: ['css-loader','sass-loader']})
          },
          {     test: /\.(jpe?g|gif|png|svg|m4v)$/,
                include: PATHS.app + '/images',
                use: 'url-loader?limit=25000&name=images/[name].[ext]'
                //loader: "file?name=images/[name].[hash].[ext]",
          },
          {
                test: /\.(eot|ttf|woff|woff2|svg)$/,
                include: PATHS.app + '/font',
                use : 'file-loader?name=font/[name].[ext]'
          },
          {
                test: /\.jsx?$/,
                use: 'babel-loader',
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
      //inline: true,


      proxy: {
            '/news': {
              target: 'http://proteo:3000',
              pathRewrite: {'^/news' : '/api/veline?filter[where][channel]=5&filter[order]=validitystart%20desc'},
              changeOrigin: true
            },
            '/wp-json': {
              target: 'http://wpmip.5t.torino.it',
              changeOrigin: true
            },
            '/meteoarpa': {
              target: 'http://telegraf:3012',
              changeOrigin: true
            },
            '/voli-caselle': {
              target: 'http://telegraf:3013',
              changeOrigin: true
            },
            '/colli': {
              target: 'http://lab.5t.torino.it',
              pathRewrite: {'^/colli' : '/mip-colli/api'},
              changeOrigin: true
            },
            '/suggest': {
              target: 'http://geococker:8082/',
            },



          }



    },
    plugins:  getPlugins()

}
