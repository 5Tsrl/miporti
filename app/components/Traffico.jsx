import React from 'react'
import trafficoAudioPlayer from './trafficoAudioPlayer'
import Video from 'react-html5video'

export default () =>(
        
    <div className="widget_traffico ">
        {/*
        <Video id="videoTraff" controls autoPlay loop muted
            poster="https://adayofrest.hm/content/themes/ador-boston-2016/assets/images/poster.jpg"
            onCanPlayThrough={() => {  }}>
            <source src="https://adayofrest.hm/content/themes/ador-boston-2016/assets/adayofrest-boston.mp4" type="video/mp4" />
        </Video>
        */}
        <h2 className="title-1">traffico in tempo reale</h2>
        <p>Aggiornamenti su traffico e viabilit&agrave; in Piemonte. <strong>Muoviti informato.</strong></p>
        <div className="align_brother_bottom">
            <div className="news_traffico close">
                <h3>Ascolta il notiziario</h3>
            </div>	
            <a href="/#traffic" className="btn_link">Visualizza eventi</a>
        </div>
        
    </div>

  
)