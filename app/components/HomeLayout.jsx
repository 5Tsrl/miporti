import React from 'react'
import { connect} from 'react-redux'
import Calcolo from './Calcolo'
import Traffico from './Traffico'
import News from './News'
import ViaggiaPiemonte from './ViaggiaPiemonte'
import Tweet from './Tweet'
import Meteo from './Meteo'
import Colli from './Colli'
import Bip from './Bip'
import Voli from './Voli'

class HomeLayout extends React.Component {
    
      render() {
        //console.log('this.props.location.query.setLng', this.props.location.query.setLng)
        return (
            
        <div className="aux widget_container">
            <div  className="widget widget_4-2">
                <Calcolo />
            </div>
            <div  className="widget widget_4-2">
                <Traffico />
            </div>
            { this.props.currentLocale != 'en' &&
            <div  className="widget widget_4-1 widget_4-1">
              <News />
            </div>
          }
            { this.props.currentLocale != 'en' &&
              <div  className="widget widget_4-1 widget_4-1">
                    <ViaggiaPiemonte />                  
              </div>
            }
            { this.props.currentLocale != 'en' &&
              <div className="widget widget_4-1">
                  <Tweet />
              </div>
            }
            <div className="widget widget_4-1">
                <Meteo url="http://mip.5t.torino.it/meteoarpa" pollInterval={2000} />
            </div>
            <div className="widget widget_4-1">
                <Colli url="http://mip.5t.torino.it/colli" pollInterval={2000}/>
			      </div>
            { this.props.currentLocale != 'en' &&
              <div className="widget widget_4-1">
                  <Bip />
              </div>
            }
            <div  className="widget widget_4-2 widget_4-4">
                <Voli url="http://mip.5t.torino.it/voli-caselle" pollInterval={10*60*1000}/>
			</div>
        </div>
      
        )
    }
}

//mappo l' intl.locale dello state di redux sulla props currentLocale
function mapStateToProps(state) {
  return { currentLocale: state.intl.locale }
}

HomeLayout = connect(mapStateToProps)(HomeLayout)
export default HomeLayout
