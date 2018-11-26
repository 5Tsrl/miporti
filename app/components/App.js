import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import HomeLayout from './HomeLayout'
import WPage from './WPage'
import NotFound from './NotFound'

import '../style.scss'

const App = () => (
  <div>
    <Header />
    <main className="main">
      <Switch>
        <Route exact path="/" component={HomeLayout} />
        <Route path="/page/:slug" component={WPage} />
        <Route component={NotFound} />
      </Switch>
    </main>
    <Footer />
  </div>
)
export default App
