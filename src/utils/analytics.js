import ReactGA from 'react-ga'
import config from '../configurations/config.yml';

// Check if Google Analytics is enabled for the application.
const hasAnalytics =
  process.env.NODE_ENV !== 'development' &&
  !!config.GOOGLE_ANALYTICS_TRACKING_ID
if (!hasAnalytics) console.warn('Google Analytics not enabled.')
else ReactGA.initialize(config.GOOGLE_ANALYTICS_TRACKING_ID)

/**
 * Log page views in Google Analytics (if enabled).
 */
const logPageView = () => {
  if (hasAnalytics) {
    const page = `${window.location.pathname}${window.location.search}`
    ReactGA.set({ page })
    ReactGA.pageview(page)
  }
  return null
}
export default logPageView
