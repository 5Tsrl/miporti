const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const config = require('./webpack.config')

const HOST = '0.0.0.0'
const PORT = 8080

//console.log('WEBPACK.CONFIG.JS', config);

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  stats: { colors: true},  
  historyApiFallback: true,
  // progress: true,  pare non avere effetto....
  
  proxy: config.devServer.proxy,
  
}).listen(PORT, HOST, function (err, result) {
  if (err) {
    return console.log(err);
  }

  console.log('Listening at http://' + HOST + ':'+ PORT );
});
