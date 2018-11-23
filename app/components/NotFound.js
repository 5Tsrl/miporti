import React from 'react'
import { Link } from 'react-router-dom'
import { connect} from 'react-redux'
import { FormattedMessage } from 'react-intl'
import PageLayout from './PageLayout.js'
import './page.scss'


class NotFound extends React.Component {
  render() {
    return (
      <PageLayout>
        <div className="widget page notfound" id="notfound">
            <h2 className="pageHeader"><FormattedMessage id='Ops...  pagina non trovata!'/></h2>
            <h3 className="errore"><FormattedMessage id='Torna alla'/><Link to="/"> Home </Link><FormattedMessage id='di Muoversi in Piemonte'/></h3>
        </div>
      </PageLayout>
    )
  }
}

//mappo l' intl.locale dello state di redux sulla props currentLocale
function mapStateToProps(state) {
  return { currentLocale: state.intl.locale }
}

NotFound = connect(mapStateToProps)(NotFound)
export default NotFound
