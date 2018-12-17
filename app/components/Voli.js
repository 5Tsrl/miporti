import React from 'react'
import { connect } from 'react-redux'
import { FormattedMessage } from 'react-intl'
import classNames from 'classnames'
import axios from 'axios'

import './voli.scss'
import PlaneTakeOff from '../images/plane_take_off.svg'
import PlaneLanding from '../images/plane_landing.svg'

const Volo = props => (
  <tr>
    <td>{props.data}</td>
    <td>{props.ora}</td>
    <td>{props.destinazione}</td>
    <td>{props.volo}</td>
    <td className='note'>{props.imbarco}</td>
  </tr>
)

const VoliTable = (props) => {
  const voliNodes = props.voli.map((volo, idx) => {
    return <Volo key={idx} data={volo.data} ora={volo.ora} destinazione={volo.destinazione} volo={volo.volo} imbarco={volo.stato} />
  })
  return (
    <div className='tabs_container'>
      <div className='tab_container first_active voli_partenze'>
        <table className='tabella_voli'>
          <thead>
            <tr>
              <th><FormattedMessage id='Data'/></th>
              <th><FormattedMessage id='Ora'/></th>
              <th>{props.partenzeArrivi === 'partenze' ? <FormattedMessage id='Destinazione'/> : <FormattedMessage id='Provenienza'/>}</th>
              <th><FormattedMessage id='Volo'/></th>
              <th>{props.partenzeArrivi === 'partenze' ? <FormattedMessage id='imbarco'/> : <FormattedMessage id='note'/>}</th>
            </tr>
          </thead>
          <tbody>
            {voliNodes}
          </tbody>
        </table>
      </div>
    </div>
  )
}

const VoliTabs = (props) => {
  const classesPartenze = classNames('tab_label tab_left', { tab_active: props.partenzeArrivi === 'partenze' })
  const classesArrivi = classNames('tab_label tab_right', { tab_active: props.partenzeArrivi === 'arrivi' })

  return (
      <div>
          <ul className='tabs_label voli_tabella_container'>
              <li onClick={props.onCurrentChoosen.bind(null, 'partenze')} className={classesPartenze}>
                <PlaneTakeOff className='imgVoli'/>
                <FormattedMessage id='Partenze'/>
              </li>
              <li onClick={props.onCurrentChoosen.bind(null, 'arrivi')} className={classesArrivi}>
                <PlaneLanding className='imgVoli'/>
                <FormattedMessage id='Arrivi'/>
              </li>
          </ul>
      </div>
  )
}

const VoliFooter = (props) => {
  const links = {
    en: {
      auto: 'http://www.aeroportoditorino.it/en/tomove/parking-transport/by-car',
      bus: 'http://www.aeroportoditorino.it/en/tomove/parking-transport/by-bus',
      train: 'http://www.aeroportoditorino.it/en/tomove/parking-transport/by-train',
      timetable: 'http://www.aeroportoditorino.it/en/tofly/flights/timetable',
    },
    it: {
      auto: 'http://www.aeroportoditorino.it/it/tomove/trasporti-e-parcheggi/in-auto',
      bus: 'http://www.aeroportoditorino.it/it/tomove/trasporti-e-parcheggi/in-bus',
      train: 'http://www.aeroportoditorino.it/it/tomove/trasporti-e-parcheggi/in-treno',
      timetable: 'http://www.aeroportoditorino.it/it/tofly/voli/orario-generale',
    },
  }

  return (
    <div className='last_info'>
        <p><FormattedMessage id='orari'/>{props.aggiornamento}</p>
        <span className='raggiungere'>
            <FormattedMessage id='raggiungere'/>
            <a href={`${links[props.currentLocale].auto}`} className='btn_partenze'><FormattedMessage id='by_auto'/></a>
                <a href={`${links[props.currentLocale].bus}`} className='btn_partenze'><FormattedMessage id='by_bus'/></a>
                    <a href={`${links[props.currentLocale].train}`} className='btn_partenze'><FormattedMessage id='by_treno'/></a>
        </span>
        <a href={`${links[props.currentLocale].timetable}`} className='btn_link'><FormattedMessage id='orario_gen'/></a>
    </div>
  )
}

class Voli extends React.Component {
  state = { partenzeArrivi: 'partenze', data: {} }

  loadVoliFromServer() {
    axios.get(this.props.url)
      .then((response) => {
        this.setState({ data: response.data })
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response.status, error.response.data)
        } else {
          console.log('errore di rete')
        }
      })
  }

  componentDidMount() {
    this.loadVoliFromServer()
  }

  handleSceltaCurrent(current) {
    // console.log('p/a', current)
    this.setState({ partenzeArrivi: current })
  }

  render() {
    let voli = []
    let aggiornamento = ''
    if (typeof this.state.data.partenze !== 'undefined') {
      voli = this.state.data[this.state.partenzeArrivi].slice(0, 4)
      aggiornamento = this.state.data.aggiornamento.split(/alle/).pop().trim()
      // console.log(aggiornamento)
    }
    return (

      <div className='widget_voli'>
        <div className='title-4'>
            <h2><FormattedMessage id='orario'/></h2>
            <h3><FormattedMessage id='aeroporto'/></h3>
            <p><FormattedMessage id='collaborazione'/>
             <a href={`http://www.aeroportoditorino.it/${this.props.currentLocale}`}>Sagat S.p.a.</a>
           </p>
        </div>
        <VoliTabs partenzeArrivi={this.state.partenzeArrivi} onCurrentChoosen={this.handleSceltaCurrent.bind(this)}/>
        <VoliTable partenzeArrivi={this.state.partenzeArrivi} voli={voli} />
        <VoliFooter aggiornamento={aggiornamento} currentLocale={this.props.currentLocale}/>

      </div>
    )
  }
}
// mappo l' intl.locale dello state di redux sulla props currentLocale
const mapStateToProps = (state) => {
  return { currentLocale: state.intl.locale }
}

Voli = connect(mapStateToProps)(Voli)
export default Voli
