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
import MainLayout from './components/MainLayout'
import HomeLayout from './components/HomeLayout'
import PageLayout from './components/PageLayout'
import WPage      from './components/WPage'
import Pvova      from './components/Pvova'
import messages_en   from './messages/en.js'
import messages_it   from './messages/it.js'

console.log('messages',messages_en)

addLocaleData([ ...it, ...en]);

const reducer = combineReducers({
  intl: intlReducer,
})
const initialState = {
  intl: {
    defaultLocale: 'it',
    locale: 'it',
    messages: messages_it,
  },
}
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

/*
locale={navigator.language}>
*/
ReactDOM.render((

<Provider store={store}>
  <Router history={browserHistory}>
    <Route component={MainLayout} >
        <Route path="/home" component={HomeLayout} />
        <Route component={PageLayout} >
            {/*
            <Route path="/(home/)servizio" component={Servizio} />
            <Route path="/(home/)contatti" component={Contatti} />
            <Route path="/(home/)radio"   component={Radio} />
            */}
            <Route path="/home/page/:slug"   component={WPage} />
            <Route path="/pvova"   component={Pvova} />
        </Route>
    </Route>
  </Router>
</Provider>


), document.getElementById('main'))
