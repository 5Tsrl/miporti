import React from 'react'
import { Link } from 'react-router'
import { connect} from 'react-redux'
import {FormattedMessage} from 'react-intl'
import './page.scss'




var NotFound = React.createClass({
  
  render: function() {
        return (
          <div className="widget page notfound">
              <h2 className="pageHeader"><FormattedMessage id='Ooops...  pagina non trovata!'/></h2>
              <h2 className="errore"><FormattedMessage id='Torna alla'/><Link to="/"> Home </Link><FormattedMessage id='di Muoversi in Piemonte'/></h2>
          </div>
      )
  }
})

//mappo l' intl.locale dello state di redux sulla props currentLocale
function mapStateToProps(state) {
  return { currentLocale: state.intl.locale }
}

NotFound = connect(mapStateToProps)(NotFound)
export default NotFound
