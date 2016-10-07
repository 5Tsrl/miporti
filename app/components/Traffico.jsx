import React from 'react'
import {FormattedMessage} from 'react-intl'
import axios from 'axios'
import moment from 'moment'
import AudioPlayer from '../audio-player/components/AudioPlayer'
import '../audio-player/app.scss';

const Traffico = React.createClass({
  
  getDefaultProps: function() {
    return {
      notiziario: 'https://www.muoversinpiemonte.it/notiziario/notiziario.mp3'
    }
  },
  getInitialState: function() {
    return { bollentinUpdate:'...'}
  },
  
    onAscoltaClick: function(e){
      e.preventDefault()
      this.refs.audioPlayer.onPlayBtnClick()
    },
    componentWillMount: function(){
      axios
          .head(this.props.notiziario)
          .then( (res) =>{
            const lm = res.headers['last-modified']
            //console.log(lm, moment(new Date(lm)).format('HH:mm'))
            this.setState({bollentinUpdate: moment(new Date(lm)).format('HH:mm')})
          })  
    },
    
    render: function() {
        
      var songs = [	{url: this.props.notiziario} ]
        
      return (

    
    <div className="widget_traffico ">
      <div className="widget_traffico_container ">
          <video id="videoTraff" muted autoPlay loop poster="http://mip.muoversinpiemonte.it/traffico.png">
            <source src="http://mip.muoversinpiemonte.it/traffico.m4v" type="video/mp4"/>          
          </video>
          
        <h2 className="title-1"><FormattedMessage id='traffico in tempo reale'/></h2> 
        <p><FormattedMessage id='Aggiornamenti su traffico e viabilità in Piemonte.'/><br /><strong><FormattedMessage id='Muoviti informato.'/></strong></p>

    </div>
    <div className="align_brother_bottom">
        <div className="area_player no_news_traffico no_close">
            <AudioPlayer ref="audioPlayer" songs={songs} />
            <a href="#" className="ascolta" onClick={this.onAscoltaClick}><FormattedMessage id='Ascolta il notiziario'  values={{bollentinUpdate: this.state.bollentinUpdate}}/> </a>
            
        </div>
        <div className="visualizza">
          <a href="https://map.muoversinpiemonte.it/#traffic" className="btn_link "><FormattedMessage id='Visualizza eventi'/></a>
        </div>
    </div>


  </div>
  )}

})

export default Traffico