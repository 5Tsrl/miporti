import React from 'react'
import './page.scss';

export default () =>
    <div className="widget page">
        <h2 className="pageHeader" >Disclaimer</h2>
        <div className="pageContent">

            <p>
            <strong>Muoversi in Piemonte</strong> utilizza OpenStreetMap come base cartografica, un progetto collaborativo finalizzato a creare mappe mondiali a contenuto libero
            e aggiornato quotidianamente da utenti liberi e indipendenti. <br />
            Si ricorda pertanto che:
            </p>
            <ul className="liv2">
                <li>sebbene in costante miglioramento, la mappa potrebbe non essere del tutto completa o aggiornata</li>
                <li>nel riconoscimento degli indirizzi per il punto di partenza e il punto di arrivo potranno verificarsi errori o imprecisioni</li>
                <li>i dati inerenti al servizio di trasporto pubblico (quali localizzazione delle fermate, orari e percorsi) sono stati forniti dalle <strong><a href="http://mip.5t.torino.it/Mip_Aggiornamento_Dati.pdf">
                Amministrazioni provinciali e comunali della Regione Piemonte e dalle aziende piemontesi di trasporto pubblico</a></strong> e sono generalmente aggiornati con cadenza
                trimestrale. Nel caso in cui l’aggiornamento non avvenga secondo tali tempistiche, alcune località potrebbero risultare non raggiungibili con i servizi di trasporto pubblico.</li>
            </ul>
            <br />
            <h2>CONDIVISIONE DELLA POSIZIONE</h2>
            <p>
            Attraverso il sito <strong><a href="http://www.muoversinpiemonte.it/">www.muoversinpiemonte.it</a></strong>, è possibile condividere la propria posizione allo scopo di migliorare l’utilizzo del servizio.
            I dati inerenti alla posizione sono trattati in forma anonima, in un formato che non consente di identificare personalmente l’utente,
            e utilizzati al solo fine di facilitare la fruizione del servizio di calcolo percorso. I servizi di localizzazione e di posizione possono
            essere attivati o disattivati dall’utente in qualunque momento accedendo alle impostazioni del proprio dispositivo o del browser di navigazione utilizzato.
            </p>
 
        </div>
    </div>
