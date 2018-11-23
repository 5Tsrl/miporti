const merge = require('webpack-merge')
const common = require('./webpack.common.js')

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          //devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          //'postcss-loader',
          'sass-loader',
        ],
      },
    ]
  },

  devServer: {
    contentBase: './dist',
    publicPath: '/',
    // Enable history API fallback so HTML5 History API based routing works.
    // the index.html page will likely have to be served in place of any 404 responses.
    historyApiFallback: true,
    //inline: true,//è il default...

    proxy: {
      '/news': {
        target: 'http://proteo:3000',
        pathRewrite: {'^/news' : '/api/veline?filter[where][channel]=5&filter[order]=validitystart%20desc'},
      },
      '/wp-json': {
        target: 'http://wpmip.5t.torino.it',
        changeOrigin: true  // da usare quando si proxa su un named virtual host!
      },
      '/notiziario': {
        target: 'https://www.muoversinpiemonte.it',
        changeOrigin: true  // da usare quando si proxa su un named virtual host!
      },
      '/meteoarpa': {
        target: 'http://telegraf:3012',
      },
      '/voli-caselle': {
        target: 'http://telegraf:3013',
      },
      '/mip-colli/api/': {
        target: 'http://lab.5t.torino.it',
        // pathRewrite: {'^/colli-alpini' : '/mip-colli/api'},
      },
      '/suggest': 'http://geococker:8082/',
    }

  }
});
