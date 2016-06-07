import React from 'react'
import Calcolo from './Calcolo'
import Traffico from './Traffico'
import News from './News'
import Tweet from './Tweet'
import Meteo from './Meteo'
import Colli from './Colli'
import Bip from './Bip'
import Voli from './Voli'

export default class HomeLayout extends React.Component {
    
      render() {
          let style = {height: '200px', color:'blue', textAlign:'center', paddingTop:'100px'}
        return (
            
        <div className="aux widget_container">
            <div  className="widget widget_4-2">
                <Calcolo />
            </div>
            <div  className="widget widget_4-2">
                <Traffico />
            </div>
            <div  className="widget widget_4-2 widget_4-4">
                <News />
            </div>
            <div className="widget widget_4-1">
                <Tweet />
            </div>
            <div className="widget widget_4-1">
                <Meteo url="http://mip.5t.torino.it/meteoarpa" pollInterval={2000} />
            </div>
            <div className="widget widget_4-1">
                <Colli url="http://mip.5t.torino.it/home/colli.json" pollInterval={2000}/>
			</div>
            <div className="widget widget_4-1">
                <Bip />
            </div>
            <div  className="widget widget_4-2 widget_4-4">
                <Voli url="http://mip.5t.torino.it/voli-caselle" pollInterval={10*60*1000}/>
			</div>
        </div>
      
        )
    }
}