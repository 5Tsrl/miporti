import React from 'react';
import {FormattedMessage} from 'react-intl'

export default () =>(

    <div className="widget_viaggia">
        <h2 className="title-2"><FormattedMessage id='Viaggia Piemonte'/></h2>
        <p>Traffico ferroviario piemontese in tempo reale</p>
        <a target="_blank" href="http://www.regione.piemonte.it/trasporti/viaggiaPiemonte/index.htm"><span  className="img_viaggia" alt="biglietto bip" ></span></a>
        <a target="_blank" href="http://www.regione.piemonte.it/trasporti/viaggiaPiemonte/index.htm" className="btn_link">Vai al sito</a>
    </div>

)
