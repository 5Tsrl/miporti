import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Footer from './Footer'
import HomeLayout from './HomeLayout'
import WPage from './WPage'
import NotFound from './NotFound'

import '../style.scss'

const App = () => (
  <React.Fragment>
    <Switch>
      <Route exact path="/" component={HomeLayout} />
      <Route path="/page/:slug" component={WPage} />
      <Route component={NotFound} />
    </Switch>
    <Footer />
  </React.Fragment>
)
export default App
