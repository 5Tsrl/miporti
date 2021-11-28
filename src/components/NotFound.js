import React from 'react'
import { Link } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'
import Header from './Header'
import PageLayout from './PageLayout.js'
import './page.scss'


const NotFound = () => (
  <React.Fragment>
    <Header />
    <main className="main">
      <PageLayout>
        <div className="widget page" id="notfound">
            <h2 className="pageHeader"><FormattedMessage id='ops'/></h2>
            <h3 className="errore">
              <FormattedMessage id='torna' values={{ linkHome: <Link to="/">Home</Link> }} />
            </h3>
        </div>
      </PageLayout>
    </main>
  </React.Fragment>
)

export default NotFound
