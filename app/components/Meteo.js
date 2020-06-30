import React from 'react'
import Collapse from 'react-collapse'
import { FormattedMessage } from 'react-intl'
import classNames from 'classnames'
import axios from 'axios'
import './meteo.scss'
import IcoArrow from '../images/select_arrow.svg'


const SelectorText = (props) => {
  const icoClasses = classNames('ico_meteo_here', { open: props.open })
  return (
      <span className='meteo_here' onClick={props.onTextClick}>
        {props.text}
        <IcoArrow className={icoClasses} />
      </span>
  )
}

const SelectorTexts = (props) => {
  const textsNodes = props.texts.map((singleText, id) => {
    return (
      // <li key={id} onClick={props.onTextsClick.bind(null,id)}>{singleText}</li>
      <li key={id} onClick={() => props.onTextsClick(id)} >{singleText} </li>
    )
  })
  return (
  <Collapse className="meteo_cities" isOpened={props.open} >
    <ul>
      {textsNodes}
    </ul>
  </Collapse>
  )
}


class Selector extends React.Component {
  state = { open: false, text: this.props.text }

    handleTextClick = () => {
      this.setState({ open: !this.state.open })
    }
    handleTextsClick = (id) => {
      this.setState({ open: !this.state.open })
      this.setState({ text: this.props.texts[id] })
      this.props.onTextIdChoosen(id)
    }
    render = () => {
      return (
            <div>
                <SelectorText open={this.state.open} text={this.props.text} onTextClick={this.handleTextClick} />
                <SelectorTexts open={this.state.open} texts={this.props.texts} onTextsClick={this.handleTextsClick}/>
            </div>
      )
    }
}

const MeteoPanel = (props) => {
  const classes = classNames('meteo_img', props.clima)
  return (
    <div>
      <div className="tab_container first_active meteo_now">
          <span className={classes}>{props.temperature}<FormattedMessage id='gradi_cent'/></span>
      </div>
      <p><FormattedMessage id='collaborazione'/><a href="https://www.arpa.piemonte.gov.it/" >Arpa Piemonte</a></p>
    </div>
  )
}

const MeteoDays = (props) => {
  const classesLiOggi = classNames('tab_label tab_left meteo_forecast meteo_today', { tab_active: props.giornoAttivo === 'oggi' })
  const classesLiDomani = classNames('tab_label tab_right meteo_forecast meteo_tomorrow', { tab_active: props.giornoAttivo === 'domani' })
  const classesOggi = classNames('meteo_img', props.clima)
  const classesDomani = classNames('meteo_img', props.climaDomani)

  return (
    <ul className="tabs_label meteo_forecast_container">
      <li onClick={props.onDayChoosen.bind(null, 'oggi')} className={classesLiOggi}>
        <FormattedMessage id='oggi'/><span className={classesOggi}></span>{props.temperature}
        <FormattedMessage id='gradi_cent'/>
      </li>
      <li onClick={props.onDayChoosen.bind(null, 'domani')} className={classesLiDomani}>
        <FormattedMessage id='domani'/><span className={classesDomani}></span>{props.temperatureDomani}
        <FormattedMessage id='gradi_cent'/>
      </li>
    </ul>
  )
}


class Meteo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      giornoAttivo: 'oggi',
      data: [],
      provId: 0,
      hover: false,
      province: ['Alessandria', 'Asti', 'Biella', 'Cuneo', 'Novara', 'Torino', 'Verbania', 'Vercelli'],
    }
  }

  cambiaProvincia = () => {
    if (!this.state.hover) {
      const newProvId = this.state.provId === this.state.province.length - 1 ? 0 : this.state.provId + 1
      this.setState({ provId: newProvId })
    }
  }

  toggleHover = () => {
    this.setState({ hover: !this.state.hover })
  }

  loadMeteoFromServer = () => {
    axios
      .get('/meteoarpa')
      .then((res) => {
        this.setState({ data: res.data })
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response.status, error.response.data)
        } else {
          console.log('errore di rete:', error)
        }
      })
  }

  componentDidMount = () => {
    this.loadMeteoFromServer()
    const intervalId = setInterval(this.cambiaProvincia, 6 * 1000)
    this.setState({ intervalId })
  }

  componentWillUnmount = () => {
    clearInterval(this.state.intervalId);
  }

  handleSceltaProvincia = (provId) => {
    const provin = this.state.data.find(el => el.id === provId)
    this.setState({ provId: provin.id })
    clearInterval(this.state.intervalId)
  }

  handleSceltaGiorno = (giorno) => {
    // console.log('giorno', gixorno)
    this.setState({ giornoAttivo: giorno })
  }

  render = () => {
    let temperature, temperatureDomani, temperaturePanel, clima, climaDomani, climaPanel = ''
    if (this.state.data.length > 1) {
      temperature = this.state.data[this.state.provId].oggi.temperature
      temperatureDomani = this.state.data[this.state.provId].domani.temperature
      temperaturePanel = this.state.data[this.state.provId][this.state.giornoAttivo].temperature
      clima = this.state.data[this.state.provId].oggi.meteoImg
      climaDomani = this.state.data[this.state.provId].domani.meteoImg
      climaPanel = this.state.data[this.state.provId][this.state.giornoAttivo].meteoImg
    }
    return (

        <div className="widget_meteo accord_widget_meteo" onMouseEnter={this.toggleHover} onMouseLeave={this.toggleHover}>
            <h2>Meteo</h2>
            <Selector texts={this.state.province} text={this.state.province[this.state.provId]} onTextIdChoosen={this.handleSceltaProvincia}/>
            <MeteoPanel temperature={temperaturePanel} clima={climaPanel}/>
            <MeteoDays
              giornoAttivo={this.state.giornoAttivo}
              temperature={temperature}
              clima={clima}
              temperatureDomani={temperatureDomani}
              climaDomani={climaDomani}
              onDayChoosen={this.handleSceltaGiorno}
            />
      </div>

    )
  }
}
export default Meteo
