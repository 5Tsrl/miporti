import React, {useContext} from 'react'

import {IntlContext} from "./IntlWrapper"
import Calcolo from './Calcolo'
import Carousel from './Carousel'
import Colli from './Colli'
import Meteo from './Meteo'
import News from './News'
import Traffico from './Traffico'
import Tweet from './Tweet'
import ViaggiaPiemonte from './ViaggiaPiemonte'
import Voli from './Voli'

const HomeLayout = (props) => {

  const intlContext = useContext(IntlContext) // prendo in context dichiarato in IntlWrapper
  const currentLocale =  intlContext.locale
  return(
    <main className="main">
      <div className="aux widget_container">
        <div className="widget widget_4-2">
            <Calcolo />
        </div>
        <div className="widget widget_4-2">
            <Traffico />
        </div>
        { currentLocale !== 'en' &&
        <div className="widget widget_4-2">
          <News />
        </div>
        }
        { currentLocale !== 'en' && false &&
          <div className="widget widget_4-1 widget_4-1">
                <ViaggiaPiemonte />
          </div>
        }
        { currentLocale !== 'en' &&
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
        { currentLocale !== 'en' &&
          <div className="widget widget_4-1">
              <Carousel />
          </div>
        }
          <div className="widget widget_4-2">
            <Voli />
          </div>
      </div>
    </main>
  )
}

export default HomeLayout
