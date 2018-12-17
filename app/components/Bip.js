import React from 'react'
import { FormattedMessage } from 'react-intl'
import LogoBip from '../images/bip.svg'

const Bip = () => (
    <div className="widget_ticket" key="1">
      <h2 className="title-2"><FormattedMessage id='bip'/></h2>
      <p><FormattedMessage id='scopri'/></p>
      <a href="http://www.bip.piemonte.it">
        <LogoBip className='logoBip'/>
        <span className="btn_link"><FormattedMessage id='vai_sito'/></span>
      </a>
    </div>
)

export default Bip
