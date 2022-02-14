const { createProxyMiddleware } = require('http-proxy-middleware')



/*
/key
Whatever key you specify in app.use method, the call will be forwarded to <domain>/<key>/<rest_path>
*/

module.exports = (app) => {

  app.use(            // così NON funge!! lui appende /voliCaselle al target!!
    '/volicaselle',
    createProxyMiddleware({
      target: 'https://pwfo8ijf7h.execute-api.eu-west-1.amazonaws.com/default/mipCaselleScrape',
      changeOrigin: true,
    })
  )

  app.use(       // così funge!! lui appende /mipCaselleScrape al target!!
    '/mipCaselleScrape',
    createProxyMiddleware({
      target: 'https://pwfo8ijf7h.execute-api.eu-west-1.amazonaws.com/default/',
      changeOrigin: true,
    })
  )

  app.use(
    '/news',  // così funge! evidentemente, quando il target è copleto di estensione? querystrin? lo mappa as is
    createProxyMiddleware({
      // target: 'https://reporter.5t.torino.it/ws/publish.php?ch=11',
      target: 'https://apimip.5t.torino.it',
      changeOrigin: true,
    })
  )

  app.use(                    // così FUNGE
    '/notiziario.mp3',
    createProxyMiddleware({
      target: 'https://s3-eu-west-1.amazonaws.com/5t.mip.notiziario/',
      changeOrigin: true,
    })
  )
  // app.use(                    // così FUNGE
  //   '/5t.mip.notiziario',
  //   createProxyMiddleware({
  //     target: 'https://s3-eu-west-1.amazonaws.com',
  //     changeOrigin: true,
  //   })
  // )
  // app.use(                     // così NON FUNGE
  //   '/notiziario/notiziario.mp3',
  //   createProxyMiddleware({
  //     target: 'https://s3-eu-west-1.amazonaws.com/5t.mip.notiziario/notiziario.mp3',
  //     changeOrigin: true,
  //   })
  // )

  app.use(
    '/notiziario-traffico-piemonte.mp3',  // url comunicata alle radio
    createProxyMiddleware({
      target: 'https://s3-eu-west-1.amazonaws.com/5t.mip.notiziario/notiziario.mp3',
      changeOrigin: true,
    })
  )

  app.use(
    '/wp-json',
    createProxyMiddleware({
      // target: 'http://wpmip.5t.torino.it',
      // target: 'http://13.37.126.25',
      target: 'https://wpmip.muoversinpiemonte.it',
      changeOrigin: true,
    })
  )

  // https://www.muoversinpiemonte.it/infomob/MIP/biketowork2017.png
  // http://wpmip.5t.torino.it/wp-content/uploads/biketowork2017.png
  // app.use(
  //   '/wp-images/',
  //   createProxyMiddleware({
  //     target: 'http://wpmip.5t.torino.it/wp-content/uploads/',
  //     changeOrigin: true,
  //   })
  // )

  app.use(
    '/getForecast',
    createProxyMiddleware({
      target: 'https://i0b1qnp3za.execute-api.eu-west-1.amazonaws.com/prod',
      changeOrigin: true,
    })
  )

  //oppure https://apimip.5t.torino.it/v1/autocomplete?text=piazzi
  app.use(
    '/autocomplete',
    createProxyMiddleware({
      target: 'https://apimip.5t.torino.it/v1',
      changeOrigin: true,
    })
    )

  // orig: http://geocoding-dns.5t.torino.it:8082/suggest?query=piazzi
  app.use(
    '/suggest',
    createProxyMiddleware({
      // target: 'http://geocoding-dns.5t.torino.it:8082', // questo non funziona perchè è http?!
      target: 'https://www.muoversinpiemonte.it', // questo funge, ma non fungerà quando il  www.muoversinpiemonte.it passa su aws...
      changeOrigin: true,
    })
  )

  app.use(
    '/colli',
    createProxyMiddleware({
      // target: 'http://docker1.5t.torino.it:90/api/index.php',
      target: 'https://apimip.5t.torino.it',
      changeOrigin: true,
    })
  )

}