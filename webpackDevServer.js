const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./webpack.config');

const HOST = '0.0.0.0'
const PORT = 8080

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  stats: { colors: true},  
  historyApiFallback: true
}).listen(PORT, HOST, function (err, result) {
  if (err) {
    return console.log(err);
  }

  console.log('Listening at http://' + HOST + ':'+ PORT );
});
