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
    host: '0.0.0.0',
    port: '8080',
    contentBase: './dist',
    publicPath: '/',
    // Enable history API fallback so HTML5 History API based routing works.
    // the index.html page will likely have to be served in place of any 404 responses.
    historyApiFallback: true,
    // inline: true,//è il default...

    proxy: {

      '/news': {
        target: 'https://reporter.5t.torino.it',
        pathRewrite: { '^/news': '/ws/publish.php?ch=11' },
        changeOrigin: true,
      },
      '/notiziario': {
        target: 'https://www.muoversinpiemonte.it',
        changeOrigin: true, // da usare quando si proxa su un named virtual host!
      },
      '/wp-json': {
        target: 'http://wpmip.5t.torino.it',
        changeOrigin: true, // da usare quando si proxa su un named virtual host!
      },
      '/wp-images': {
        target: 'http://wpmip.5t.torino.it',
        pathRewrite: { '^/wp-images': '/wp-content/uploads' },
        changeOrigin: true, // da usare quando si proxa su un named virtual host!
      },
      '/meteoarpa': {
        target: 'https://dsml3n16i9.execute-api.eu-west-1.amazonaws.com',
        pathRewrite: { '^/meteoarpa': '/v1/mipArpaScrape' },
        changeOrigin: true,
      },
      '/voli-caselle': {
        target: 'https://pwfo8ijf7h.execute-api.eu-west-1.amazonaws.com',
        pathRewrite: { '^/voli-caselle': '/default/mipCaselleScrape' },
        changeOrigin: true,
      },
      '/colli': {
        target: 'http://swarm.5t.torino.it:90',
        pathRewrite: { '^/colli': '/api/index.php' },
      },
      '/suggest': 'http://geococker:8082/',
    },

  },
});
