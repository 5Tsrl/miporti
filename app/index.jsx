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
import Servizio from './pages/Servizio'
import Contatti from './pages/Contatti'
import Disclaimer from './pages/Disclaimer'
import DisclaimerWP from './pages/DisclaimerWP'
import Cookie from './pages/Cookie'
import Radio from './pages/Radio'
import WPage from './components/WPage'

addLocaleData([ ...it, ...en]);

const browserHistory = useRouterHistory(createHistory)({
    //basename: "/home"
});

ReactDOM.render((
<IntlProvider locale={navigator.language}>
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
        </Route>
        
    </Route>
        
  </Router>
</IntlProvider>  
    
), document.getElementById('main'))
