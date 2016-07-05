import React from 'react'
import trafficoAudioPlayer from './trafficoAudioPlayer'
import {FormattedMessage} from 'react-intl'
import Video from 'react-html5video'
import AudioPlayer from '../audio-player/components/AudioPlayer'
import '../audio-player/app.scss';

const Traffico = React.createClass({
    
    render: function() {
        
        var songs = [
        	{url: "http://www.muoversinpiemonte.it/notiziario/notiziario.mp3"}
        ]
        
        return (
<div className="widget_traffico_container ">
    {/* 
    <Video id="videoTraff" autoPlay loop muted
        poster="https://adayofrest.hm/content/themes/ador-boston-2016/assets/images/poster.jpg"
        onCanPlayThrough={() => {  }}>
        <source src="https://adayofrest.hm/content/themes/ador-boston-2016/assets/adayofrest-boston.mp4" type="video/mp4" />
    </Video>
    
    <video id="videoTraff" autoPlay loop="" poster="https://adayofrest.hm/content/themes/ador-boston-2016/assets/images/poster.jpg">
      <source src="https://adayofrest.hm/content/themes/ador-boston-2016/assets/adayofrest-boston.mp4" type="video/mp4"/>          
    </video>
    */}
    <div className="widget_traffico ">
        
        <h2 className="title-1"><FormattedMessage id='traffico in tempo reale'/></h2> 
        <p><FormattedMessage id='Aggiornamenti su traffico e viabilità in Piemonte.'/><br /><strong><FormattedMessage id='Muoviti informato.'/></strong></p>
        <div className="align_brother_bottom">
            <div className="area_player" className="no_news_traffico no_close">
                <AudioPlayer songs={songs} />
                <h3><FormattedMessage id='Ascolta il notiziario'/></h3>
            </div>
            <a href="/#traffic" className="btn_link"><FormattedMessage id='Visualizza eventi'/></a>
        </div>
        {/*
        <div style={{marginTop:120}}>
            
            <div className="NOnews_traffico NOclose">
                <AudioPlayer songs={songs} />
                <h3><FormattedMessage id='Ascolta il notiziario'/></h3>
            </div>
            <a href="/#traffic" className="btn_link"><FormattedMessage id='Visualizza eventi'/></a>
        </div>
        */}

    </div>
  </div>
)}


})

export default Traffico
