import React from 'react'
import { Route, Switch } from 'react-router-dom'

import HelmetApp from './HelmetApp'
import Footer from './Footer'
import HomeLayout from './HomeLayout'
import WPage from './WPage'
import NewsPage from './NewsPage'
import NotFound from './NotFound'
import logPageView from '../utils/analytics'

import '../style.scss'

const App = () => (
  <React.Fragment>
    <Route component={logPageView} /> {/* matcha ogni cambio di history e logga su GA */}
    <HelmetApp />
    <Switch>
      <Route exact path="/" component={HomeLayout} />
      <Route path="/page/:slug" component={WPage} />
      <Route exact path="/avvisi" component={NewsPage} />
      <Route component={NotFound} />
    </Switch>
    <Footer />
  </React.Fragment>
)
export default App
