import './style.scss'

import React from 'react'
import ReactDOM from 'react-dom'
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

addLocaleData([ ...it, ...en]);

const browserHistory = useRouterHistory(createHistory)({
    //basename: "/home"
});

const translation = {
    'calcolo.title':'trip planner',
    '_calcolo.da':'from',
    'calcolo.a':'to',
    'calcolo.calcola':'plan',
    'calcolo.mezzi':'Public transport',
    
}
/*
locale={navigator.language}>
*/
ReactDOM.render((
<IntlProvider key={navigator.language} defaultLocale="it-IT" locale="it" messages={translation}>
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
</IntlProvider>  
    
), document.getElementById('main'))
