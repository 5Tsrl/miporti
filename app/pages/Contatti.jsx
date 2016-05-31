import React from 'react'
import './page.scss';

export default () =>
    <div className="widget page">
        <h2 className="pageHeader">Contatti</h2>
        <div className="pageContent">

            <p>Per segnalazioni e suggerimenti:</p><br />
                <ul  className="liv2">
                    <li>scrivi a <strong><a href="mailto:muoversinpiemonte@5t.torino.it">muoversinpiemonte@5t.torino.it</a></strong></li><br />
                    <li>contatta il Numero Verde Unico della Regione Piemonte <strong>800 333 444</strong> attivo dal lunedì al venerdì 
                    dalle ore 8 alle 18 con orario continuato, festivi esclusi, gratuito da telefono fisso e mobile.</li>
                </ul>
        </div>
    </div>
