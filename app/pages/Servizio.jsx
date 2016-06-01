import React from 'react'
import { Link } from 'react-router'
import './page.scss';

export default () =>
    
    <div className="widget  page">
        <h2 className="pageHeader" >Il Servizio</h2>
        <div className="pageContent">

            <p>
            <strong>Muoversi in Piemonte</strong> è il servizio unico di infomobilità che offre informazioni utili e aggiornate per pianificare i tuoi spostamenti sul
            territorio regionale.
            </p><br /><p>
            Il servizio include:
            </p><ul className="liv1">
                 <li>aggiornamenti costanti e in tempo reale sui principali eventi che possono condizionare il traffico sulle strade regionali: interruzioni stradali, eventi
                 atmosferici, code, incidenti ed emergenze.
                 <p><br />
                 Le informazioni sul traffico sono diffuse attraverso 4 canali:
                 </p>
                     <ul className="liv2">
                          <li>bollettini radiofonici, diffusi su oltre <strong><Link to="/radio">30 emittenti radiofoniche</Link></strong> a copertura locale e regionale o radio e con le seguenti modalità:
                          dal lunedì al venerdì: 7.40 - 8.10 - 9.10 - 10.10 - 13.10 - 16.10 - 17.10 - 18.10 - 19.10 - 20.10
                          il sabato, domenica e festivi: 8.10 - 9.10 - 10.10 - 13.10 - 16.10 - 17.10 - 18.10 - 19.10 - 20.10 - 21.10</li>
                          <li>il portale web <strong><a href="http://www.muoversinpiemonte.it/mip/">www.muoversinpiemonte.it</a></strong>, costantemente aggiornato
                            dal lunedì al venerdì dalle 7.00 alle 20.00; il sabato, domenica e festivi dalle 8.00 alle 22.00.</li>
                          <li>il Numero Verde Unico della Regione Piemonte <strong>800 333 444</strong> attivo dal lunedì al venerdì dalle ore 8 alle 18 con orario continuato, festivi esclusi, gratuito
                          da telefono fisso e mobile.</li>
                          <li>l’account Twitter <strong><a href="https://twitter.com/MIPiemonte">@MIPiemonte</a></strong></li>
                     </ul>
                 </li>
                 <li>un servizio di calcolo percorsi che permette di ricercare e pianificare gli spostamenti sul territorio regionale
                 utilizzando i servizi di trasporto pubblico in tutte le sue declinazioni (bus e tram urbani, servizi extraurbani e treno) o tramite percorsi pedonali o con
                 l’utilizzo dell’auto personale. Il servizio utilizza tecnologie open source, largamente diffuse e consolidate come <a href="http://www.openstreetmap.org/">OpenStreetMap</a> e <a href="http://www.opentripplanner.org/">OpenTripPlanner</a>, e si basa
                 sugli orari programmati forniti dagli Enti e dalle aziende piemontesi di trasporto pubblico aderenti al sistema BIP (<a href="http://bip.piemonte.it/">Biglietto Integrato Piemonte</a>).
                 </li></ul><br />
            <p>
            <strong>Muoversi in Piemonte</strong> è un servizio promosso da <strong><a href="http://www.regione.piemonte.it/trasporti/">Regione Piemonte</a></strong> in collaborazione con <strong><a href="http://www.5t.torino.it/">5T</a></strong>.
            </p>
        
        </div>
              
    </div>
