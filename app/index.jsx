import './style.scss'

import React from 'react'
import ReactDOM from 'react-dom'
//import { Router, Route, Link,  browserHistory } from 'react-router'
import { Router, Route, useRouterHistory } from 'react-router'
import { createHistory } from "history";
import MainLayout from './components/MainLayout'
import HomeLayout from './components/HomeLayout'
import PageLayout from './components/PageLayout'
import Servizio from './pages/Servizio'
import Contatti from './pages/Contatti'
import utility from './utility'

const browserHistory = useRouterHistory(createHistory)({
    basename: "/home"
});

ReactDOM.render((
  <Router history={browserHistory}>
    <Route component={MainLayout} >
        <Route path="/" component={HomeLayout} />
        <Route component={PageLayout} >
            <Route path="/servizio" component={Servizio} />
            <Route path="/contatti" component={Contatti} />
        </Route>
        
    </Route>
        
  </Router>
    
), document.getElementById('main'))