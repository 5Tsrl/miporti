
// import './images/favicon.ico'
// import './robots.txt'

import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, combineReducers } from 'redux'
import { Provider, intlReducer } from 'react-intl-redux' // Provider di react-intl-redux wrappa tutto
import { addLocaleData } from 'react-intl'
import localeDataIt from 'react-intl/locale-data/it'
import localeDataEn from 'react-intl/locale-data/en'
import { BrowserRouter } from 'react-router-dom'
import lscache from 'lscache'

import './utils/polyfills.js'
import App from './components/App'
import messages_en from './messages/en.js'
import messages_it from './messages/it.js'


/* utility functions */
function getParameterByName(name, url) {
  const purl = url || window.location.href;
  const pname = name.replace(/[[]]/g, '\\$&');
  const regex = new RegExp(`[?&]${pname}(=([^&#]*)|&|#|$)`)
  const results = regex.exec(purl)
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

// gestione cookie lingua
const i18next = document.cookie.replace(/(?:(?:^|.*;\s*)i18next\s*=\s*([^;]*).*$)|^.*$/, '$1')
// console.log('i18next', i18next);

let setLng = getParameterByName('setLng')
if (!setLng || setLng === '') {
  if (i18next) {
    setLng = i18next.substring(0, 2) // se it-IT -> solo it
  } else {
    setLng = lscache.get('preferredLocale')
    if (!setLng) setLng = 'it'
  }
}
// console.log('setLng', setLng);
document.cookie = `i18next=${setLng};domain=muoversinpiemonte.it;path=/`
const i18n = { messages_it, messages_en }

// aggiunge i locale necessari a react-intl ( formati date, ora, etc)
addLocaleData([...localeDataIt, ...localeDataEn])

const initialState = {
  intl: {
    defaultLocale: 'it',
    locale: setLng,
    messages: i18n[`messages_${setLng}`],
  },
}

const reducer = combineReducers({
  intl: intlReducer,
})
const store = createStore(reducer, initialState)

ReactDOM.render(

  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('app'),
)
