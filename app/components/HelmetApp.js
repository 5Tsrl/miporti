import React from 'react'
import { Helmet } from 'react-helmet';

const HelmetApp = () => (
  <Helmet>
    <meta charSet='utf-8' />
    <meta name='viewport' content='width=device-width, initial-scale=1.0' />
    <title>Tutti i servizi per muoverti informato | Muoversi in Piemonte</title>
    <meta name='description'
       content='Servizio unico di infomobilità per pianificare i tuoi spostamenti
       con aggiornamenti in tempo reale sul traffico sulle strade regionali' />
    <meta name='keywords' content='Servizio infomobilità, traffico, colli alpini, orario voli da Caselle, news traffico, notiziario' />
    <link rel='shortcut icon' href='/images/favicon.ico' />
    <link href='https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700' rel='stylesheet' type='text/css' />
  </Helmet>
)
export default HelmetApp
