import './style.scss'

import React from 'react'
import ReactDOM from 'react-dom'
import {createStore, combineReducers} from 'redux'
import {Provider, intlReducer, update} from 'react-intl-redux'
import {addLocaleData, IntlProvider} from 'react-intl';
import it from 'react-intl/locale-data/it';
import en from 'react-intl/locale-data/en';
//import { Router, Route, Link,  browserHistory } from 'react-router'
import { Router, Route, useRouterHistory } from 'react-router'
import { createHistory } from "history";
import lscache from 'lscache'
import MainLayout from './components/MainLayout'
import HomeLayout from './components/HomeLayout'
import PageLayout from './components/PageLayout'
import WPage      from './components/WPage'
import Pvova      from './components/Pvova'
import NotFound   from './components/NotFound'
import messages_en   from './messages/en.js'
import messages_it   from './messages/it.js'

/*utility functions*/
function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

// gestione cookie lingua
let i18next = document.cookie.replace(/(?:(?:^|.*;\s*)i18next\s*\=\s*([^;]*).*$)|^.*$/, "$1")
//console.log('i18next', i18next);

let setLng = getParameterByName('setLng')
if(! setLng || setLng == ''){
  if(i18next){
    setLng = i18next
  } else{
    setLng = lscache.get('preferredLocale' )
    if(! setLng )  setLng = 'it'
  }
}
//console.log('setLng', setLng);
document.cookie = 'i18next='+setLng+';domain=muoversinpiemonte.it;path=/'
const i18n={messages_it, messages_en}

addLocaleData([ ...it, ...en]);

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


const browserHistory = useRouterHistory(createHistory)({
    //basename: "/home"
});



/*demo switch*/
/*
var lang = 'it'
setInterval(() => {
    let messages = {}
          if(lang == 'it'){
            lang ='en' 
            messages=messages_en
        }else {
            lang ='it' 
            messages=messages_it
            
        }
        let locale = lang
          console.log(lang)
          store.dispatch(update({
              locale,
              messages,
            }))
        }, 30000);
*/


ReactDOM.render((

<Provider store={store}>
  <Router history={browserHistory}>
    <Route component={MainLayout} >
        <Route path="/" component={HomeLayout} />
        <Route component={PageLayout} >
            <Route path="/page/:slug"   component={WPage} />
            <Route path="/pvova"   component={Pvova} />
            <Route path="*"   component={NotFound} />
        </Route>
    </Route>
  </Router>
</Provider>


), document.getElementById('main'))
