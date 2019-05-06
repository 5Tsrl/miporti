import React from 'react'
import { injectIntl, FormattedMessage } from 'react-intl'
import axios from 'axios'
import AudioPlayer from './audio-player/AudioPlayer'
import './traffico.scss'
import IcoTraffico from '../images/traffico.svg'
import imgTraffico from '../images/traffico.jpg'
import videoTraffico from '../images/traffico.m4v'

class Traffico extends React.Component {
  constructor(props) {
    super(props)
    this.audioPlayerRef = React.createRef();
    // check connection type
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection
    const downlink = connection ? connection.downlink : 0
    // console.log('connection', connection)
    this.state = {
      bollentinUpdate: '...',
      songs: [{ url: '/notiziario/notiziario.mp3' }],
      downlink: downlink || 0,
    }
  }

  onAscoltaClick(e) {
    e.preventDefault()
    this.audioPlayerRef.current.onPlayBtnClick()
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

    <div className='widget_traffico'>
      <div className='widget_traffico_container'>
        {this.state.downlink > 8 ?
        <video id='videoTraff' muted autoPlay loop poster={imgTraffico}>
          <source src={videoTraffico} type='video/mp4'/>
        </video>
        :
        <div id='imgTraff' style={{ backgroundImage: `url(${imgTraffico})` }}>
          <p></p>
        </div>
        }
        <h2 className='title-1'>
          <IcoTraffico className="icoTraffico" />
          <FormattedMessage id='traffico'/>
        </h2>
        <p><FormattedMessage id='aggiornamenti'/>
          <br /><strong><FormattedMessage id='muoviti'/></strong>
        </p>
      </div>
      <div className='align_brother_bottom'>
        <div className='area_player'>
          <AudioPlayer ref={this.audioPlayerRef} songs={this.state.songs} />
          <a href='#' className='ascolta' onClick={this.onAscoltaClick.bind(this)}>
            <FormattedMessage id='ascolta' values={{ bollentinUpdate: this.state.bollentinUpdate }}/>
          </a>
        </div>
        <div className='visualizza'>
          <a href='https://map.muoversinpiemonte.it/#traffic' className='btn_link '><FormattedMessage id='eventi'/></a>
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
