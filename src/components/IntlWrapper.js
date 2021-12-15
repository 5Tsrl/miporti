import React, {useState} from 'react'
import {IntlProvider} from 'react-intl'

import messages_en from '../messages/en.js'
import messages_it from '../messages/it.js'


// componente liberamente ispirato a https://lokalise.com/blog/react-i18n-intl/




export const IntlContext = React.createContext()




// leggo la lingua del browser
let local = navigator.language
// leggo il cookie i18next
const i18next = document.cookie.replace(/(?:(?:^|.*;\s*)i18next\s*=\s*([^;]*).*$)|^.*$/, '$1')
// console.log('i18next', i18next)
if (i18next) {
  local = i18next.substring(0, 2) // se it-IT -> solo it
} else {
  document.cookie = `i18next=${local}`
}

let initialMessages = messages_it
if (local === 'en') {
  initialMessages = messages_en
}

const IntlWrapper = (props) => {
    const [locale, setLocale] = useState(local)

    const [messages, setMessages] = useState(initialMessages)

    const selectLanguage = (newLocale) => {
      // console.log('IntlWrapper, selectLanguage, newLocale:', newLocale)
      setLocale(newLocale)
      if (newLocale === 'en') {
          setMessages(messages_en)
      } else if (newLocale === 'it'){
          setMessages(messages_it)          
      }

      //imposto il cookie
      document.cookie = `i18next=${newLocale}`
    }

    return (
        <IntlContext.Provider value = {{locale, selectLanguage}}>
            <IntlProvider messages={messages} locale={locale}>
                {props.children}
            </IntlProvider>
        </IntlContext.Provider>

    )
}

export default IntlWrapper