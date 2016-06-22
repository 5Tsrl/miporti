import React from 'react';
import {FormattedMessage} from 'react-intl'

export default () =>(

    <div className="widget_ticket">
        <h2 className="title-2"><FormattedMessage id='Biglietto integrato Piemonte'/></h2>
        <p><FormattedMessage id='Scopri di più sul sistema regionale di bigliettazione elettronica.'/></p>
        <a target="_blank" href="http://www.bip.piemonte.it"><span  className="img_ticket" alt="biglietto bip" ></span></a>
        <a target="_blank" href="http://www.bip.piemonte.it" className="btn_link"><FormattedMessage id='Vai al sito'/></a>
    </div>

)
