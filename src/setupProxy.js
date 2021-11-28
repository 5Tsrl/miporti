const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = (app) => {

  app.use(
    '/news',
    createProxyMiddleware({
      target: 'https://reporter.5t.torino.it/ws/publish.php?ch=11',
      changeOrigin: true,
    })
  )

  app.use(
    '/notiziario/notiziario.mp3',
    createProxyMiddleware({
      target: 'https://s3-eu-west-1.amazonaws.com/5t.mip.notiziario/notiziario.mp3',
      changeOrigin: true,
    })
  )

  app.use(
    '/notiziario-traffico-piemonte.mp3',  // url comunicata alle radio
    createProxyMiddleware({
      target: 'https://s3-eu-west-1.amazonaws.com/5t.mip.notiziario/notiziario.mp3',
      changeOrigin: true,
    })
  )

  app.use(
    '/wp-json/',
    createProxyMiddleware({
      target: 'http://wpmip.5t.torino.it/wp-json/',
      changeOrigin: true,
    })
  )

  app.use(
    '/wp-images/',
    createProxyMiddleware({
      target: 'http://wpmip.5t.torino.it/wp-content/uploads/',
      changeOrigin: true,
    })
  )

  app.use(
    '/meteoarpa',
    createProxyMiddleware({
      target: 'https://i0b1qnp3za.execute-api.eu-west-1.amazonaws.com/prod/getForecast',
      changeOrigin: true,
    })
  )

  app.use(
    '/voli-caselle',
    createProxyMiddleware({
      target: 'https://pwfo8ijf7h.execute-api.eu-west-1.amazonaws.com/default/mipCaselleScrape',
      changeOrigin: true,
    })
  )

  app.use(
    '/suggest',
    createProxyMiddleware({
      target: 'http://geocoding-dns.5t.torino.it:8082/suggest',
      changeOrigin: true,
    })
  )

  app.use(
    '/colli',
    createProxyMiddleware({
      target: 'http://docker1.5t.torino.it:90/api/index.php',
      changeOrigin: true,
    })
  )

}