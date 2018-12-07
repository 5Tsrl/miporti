const merge = require('webpack-merge') // eslint-disable-line import/no-extraneous-dependencies
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer') // eslint-disable-line import/no-extraneous-dependencies
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
          'css-loader',
          // 'postcss-loader',
          'sass-loader',
        ],
      },
    ],
  },

  plugins: [
    // new BundleAnalyzerPlugin(),
  ],

  devServer: {
    contentBase: './dist',
    publicPath: '/',
    // Enable history API fallback so HTML5 History API based routing works.
    // the index.html page will likely have to be served in place of any 404 responses.
    historyApiFallback: true,
    // inline: true,//è il default...

    proxy: {

      '/news': {
        target: 'http://proteo:3000',
        pathRewrite: { '^/news': '/api/veline?filter[where][channel]=5&filter[order]=priority%20desc' },
      },
      '/notiziario': {
        target: 'https://www.muoversinpiemonte.it',
        changeOrigin: true, // da usare quando si proxa su un named virtual host!
      },
      '/wp-json': {
        target: 'http://wpmip.5t.torino.it',
        changeOrigin: true, // da usare quando si proxa su un named virtual host!
      },
      '/meteoarpa': {
        target: 'http://telegraf:3012',
      },
      '/voli-caselle': {
        target: 'http://telegraf:3013',
      },
      '/colli': {
        target: 'http://lab.5t.torino.it',
        pathRewrite: { '^/colli': '/mip-colli/api/' },
      },
      '/suggest': 'http://geococker:8082/',
    },

  },
});
