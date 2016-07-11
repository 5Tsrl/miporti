import React from 'react'
import { Link } from 'react-router'
import {FormattedMessage} from 'react-intl'
import './page.scss';




var NotFound = React.createClass({
  render: function() {
      return (
          <div className="widget page notfound">
              <h2 className="pageHeader"><FormattedMessage id='Ooops . . . pagina non trovata!'/></h2>
              <h2 className="errore"><FormattedMessage id='Torna alla'/><Link to="/home"> Home </Link><FormattedMessage id='del servizio Muoversi in Piemonte'/></h2>
          </div>
      )
  }
})


export default NotFound
