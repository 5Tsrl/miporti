import React from 'react'
import { injectIntl, FormattedMessage } from 'react-intl'
import axios from 'axios'
import AudioPlayer from '../audio-player/components/AudioPlayer'
// import '../audio-player/audioplayer.scss'
import '../images/traffico.png'
import '../images/traffico.jpg'
import '../images/traffico.m4v'

class Traffico extends React.Component {
  constructor(props) {
    super(props)
    // this.audioPlayerRef= React.createRef();
    this.state = {
      bollentinUpdate: '...',
      songs: [{ url: 'https://www.muoversinpiemonte.it/notiziario/notiziario.mp3' }],
    }
  }

  onAscoltaClick(e) {
    e.preventDefault()
    this.audioPlayerRef.onPlayBtnClick()
  }

  static formatTime(lastModified) {
    const date = new Date(lastModified)
    const hours = date.getHours()
    const minutes = date.getMinutes()
    const minutesPad = minutes < 10 ? `0${minutes}` : minutes
    const strTime = `${hours}:${minutesPad}`
    return strTime
  }

  componentDidMount() {
    axios
      .head(this.props.notiziario)
      .then((res) => {
        const lm = res.headers['last-modified']
        this.setState({ bollentinUpdate: Traffico.formatTime(lm) })
      })
      .catch((error) => {
        console.log(error)
      })
  }

  render() {
    return (

    <div className="widget_traffico ">
      <div className="widget_traffico_container ">
        <video id="videoTraff" muted autoPlay loop poster="images/traffico.png">
          <source src="images/traffico.m4v" type="video/mp4"/>
        </video>
        <h2 className="title-1"><FormattedMessage id='traffico in tempo reale'/></h2>
        <p><FormattedMessage id='Aggiornamenti su traffico e viabilità in Piemonte.'/>
          <br /><strong><FormattedMessage id='Muoviti informato.'/></strong>
        </p>
      </div>
      <div className="align_brother_bottom">
        <div className="area_player no_news_traffico no_close">
          <AudioPlayer ref={c => this.audioPlayerRef = c} songs={this.state.songs} />
          <a href="#" className="ascolta" id='Ascolta il notiziario'
            onClick={this.onAscoltaClick.bind(this)}>
            <FormattedMessage id='Ascolta il notiziario' values={{ bollentinUpdate: this.state.bollentinUpdate }}/>
          </a>
        </div>
        <div className="visualizza">
          <a href="https://map.muoversinpiemonte.it/#traffic" className="btn_link "><FormattedMessage id='Visualizza eventi'/></a>
        </div>
    </div>
  </div>
    )
  }
}
Traffico.defaultProps = {
  notiziario: '/notiziario/notiziario.mp3',
}

export default injectIntl(Traffico)
