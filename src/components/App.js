import React from 'react'
import { Routes, Route } from 'react-router-dom'

import Header from './Header'
import Footer from './Footer'
import HomeLayout from './HomeLayout'
import WPage from './WPage'
import NotFound from './NotFound'
import { useAnalyticsTracking } from '../utils/analytics'
import '../style.scss'

const App = () => {
  useAnalyticsTracking();
  // let location = useLocation()
  // useEffect(() => {
  //   console.log('qui location.pathname', location.pathname)
  //   logPageView(location.pathname + location.search)
  // }, [location])

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomeLayout />} />
        <Route path="/page/:slug" element={<WPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
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
