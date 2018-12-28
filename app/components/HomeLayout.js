import React from 'react'
import { connect } from 'react-redux'
import Calcolo from './Calcolo'
import Carousel from './Carousel'
import Colli from './Colli'
import Header from './Header'
import Meteo from './Meteo'
import NewsWidget from './NewsWidget'
import Traffico from './Traffico'
import Tweet from './Tweet'
import ViaggiaPiemonte from './ViaggiaPiemonte'
import Voli from './Voli'

class HomeLayout extends React.Component {
  render() {
    // console.log('this.props.location.query.setLng', this.props.location.query.setLng)
    return (
      <React.Fragment>
        <Header />
        <main className="main">
        <div className="aux widget_container">
            <div className="widget widget_4-2">
                <Calcolo />
            </div>
            <div className="widget widget_4-2">
                <Traffico />
            </div>
            { this.props.currentLocale !== 'en' &&
            <div className="widget widget_4-2">
              <NewsWidget />
            </div>
            }
            { this.props.currentLocale !== 'en' && false &&
              <div className="widget widget_4-1 widget_4-1">
                    <ViaggiaPiemonte />
              </div>
            }
            { this.props.currentLocale !== 'en' &&
              <div className="widget widget_4-1">
                  <Tweet />
              </div>
            }
            <div className="widget widget_4-1">
                <Meteo />
            </div>
            <div className="widget widget_4-1">
                <Colli />
            </div>
            { this.props.currentLocale !== 'en' &&
              <div className="widget widget_4-1">
                  <Carousel />
              </div>
            }
              <div className="widget widget_4-2">
                <Voli url="/voli-caselle" />
              </div>
        </div>
      </main>
    </React.Fragment>

    )
  }
}

// mappo l' intl.locale dello state di redux sulla props currentLocale
function mapStateToProps(state) {
  return { currentLocale: state.intl.locale }
}

HomeLayout = connect(mapStateToProps)(HomeLayout)
export default HomeLayout
