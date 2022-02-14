import {useEffect} from 'react'
import { useLocation } from 'react-router-dom'
import ReactGA from 'react-ga'

const GA_TRACKING_ID = 'UA-4633264-4'


if (process.env.NODE_ENV === 'development'){
  console.warn('Google Analytics not enabled.')
} else {
  ReactGA.initialize(GA_TRACKING_ID)
}

/**
 * Log page views in Google Analytics (if enabled).
 */
const useAnalyticsTracking = () => {
  let location = useLocation()
  useEffect(() => {
    // console.log('qui location.pathname', location.pathname)
    const page = `${location.pathname}${location.search}`
    ReactGA.set({ page })
    ReactGA.pageview(page)

  }, [location])

  // console.log('logPageView')
}
export {useAnalyticsTracking}
