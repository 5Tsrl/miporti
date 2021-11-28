import React from 'react'
import { Routes, Route } from 'react-router-dom'


// import HelmetApp from './HelmetApp'
import Footer from './Footer'
import HomeLayout from './HomeLayout'
// import WPage from './WPage'
// import NotFound from './NotFound'
import Bip from './Bip'
// import logPageView from '../utils/analytics'

import '../style.scss'

const App = () => {



  return (
    <React.Fragment>
      <Routes>
        <Route path="/" element={<HomeLayout />} />
        <Route path="about" element={<Bip />} />
      </Routes>
      <Footer />

    </React.Fragment>
  )




  // <React.Fragment>
  //   {/*<Route component={logPageView} />  matcha ogni cambio di history e logga su GA */}
  //   {/* <HelmetApp /> */}

  //   <Routes>
  //     {/* <Route exact path="/" component={HomeLayout} /> */}
  //     {/* <Route path="/page/:slug" component={WPage} /> */}
  //     {/* <Route component={NotFound} /> */}
  //     </Routes>
  //   {/* <Footer /> */}
  // </React.Fragment>


}





export default App
