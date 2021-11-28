import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import {IntlProvider, FormattedMessage, FormattedNumber} from 'react-intl'

import './index.css'
import App from './components/App'
import messages_en from './messages/en.js'
import messages_it from './messages/it.js'

ReactDOM.render(
  // <React.StrictMode>
  <IntlProvider messages={messages_it} locale="it" defaultLocale="it">
    <BrowserRouter>
      <App />
    </BrowserRouter>

  </IntlProvider>
  // </React.StrictMode>
  ,
  document.getElementById('root')
)
