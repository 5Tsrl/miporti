import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import IntlWrapper from './components/IntlWrapper.js'

import App from './components/App'



ReactDOM.render(
//  <React.StrictMode>

  <IntlWrapper>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </IntlWrapper>

// </React.StrictMode>
  ,
  document.getElementById('root')
)
