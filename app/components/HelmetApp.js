import React from 'react'
import { Helmet } from 'react-helmet';

import '../images/favicon.ico'
import '../robots.txt'
import '../sitemap.txt'
// google verification file:
// https://search.google.com/search-console/ownership?resource_id=https%3A%2F%2Fwww.muoversinpiemonte.it%2F
import '../google2d5a70150f443732.html'

const HelmetApp = () => (
  <Helmet>
    <meta charset="utf-8" />
    <meta name='viewport' content='width=device-width, initial-scale=1.0' />
    <title>Tutti i servizi per muoverti informato | Muoversi in Piemonte</title>
    <meta name='description'
       content='Servizio unico di infomobilità per pianificare i tuoi spostamenti
       con aggiornamenti in tempo reale sul traffico sulle strade regionali' />
    <meta name='keywords' content='Servizio infomobilità, traffico, colli alpini, orario voli da Caselle, news traffico, notiziario' />
    <link rel='shortcut icon' href='/images/favicon.ico' />
  </Helmet>
)
export default HelmetApp
