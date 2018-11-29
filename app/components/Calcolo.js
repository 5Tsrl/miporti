import React from 'react'
import { injectIntl, FormattedMessage } from 'react-intl'
import GeocodeSuggest from './GeocodeSuggest'
import './calcolo.scss'

class Calcolo extends React.Component {
  state = {
    otpMode: 'TRANSIT,WALK',
    value_from: '',
    value_to: '',
    coord_from: '',
    coord_to: '',
  }

  handleModeChanged = (mode) => {
    console.log('switched to ', mode)
    this.setState({ otpMode: mode })
  }
  onChangeFrom = (e, newValue) => {
    // console.log(e)
    e.preventDefault()
    e.stopPropagation()
    this.setState({ value_from: newValue })
  }
  onChangeTo = (e, newValue) => {
    e.stopPropagation()
    this.setState({ value_to: newValue })
  }

  handleReverseBtn = (e) => {
    e.preventDefault()
    e.stopPropagation()
    console.log('invertito')
    const value_from_tmp = this.state.value_from
    const coord_from_tmp = this.state.coord_from
    this.setState({
      value_from: this.state.value_to,
      coord_from: this.state.coord_to,
      value_to: value_from_tmp,
      coord_to: coord_from_tmp,
    })
  }
  handleFromSelected = (suggestion) => {
    if (suggestion) {
      this.setState({ value_from: suggestion.properties.hint })
      this.setState({ coord_from: `::${suggestion.geometry.coordinates[1]},${suggestion.geometry.coordinates[0]}` })
    }
  }
  handleToSelected = (suggestion) => {
    if (suggestion) {
      this.setState({ value_to: suggestion.properties.hint })
      this.setState({ coord_to: `::${suggestion.geometry.coordinates[1]},${suggestion.geometry.coordinates[0]}` })
    }
  }
  handleSubmit = (e) => {
    e.preventDefault()
    const params = {
      module: 'planner',
    }
    if (this.state.coord_from && this.state.coord_to) {
      params.fromPlace = this.state.value_from + this.state.coord_from
      params.toPlace = this.state.value_to + this.state.coord_to
      params.mode = this.state.otpMode
    }
    const queryString = Object.keys(params).map((k) => { return `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}` }).join('&')
    // console.log(queryString)
    location.href = `http://map.muoversinpiemonte.it/#planner?${queryString}`
  }
  render = () => {
    const { formatMessage } = this.props.intl
    const styles = {
      widget_viaggio: { color: '#fff' }, // esempio di inline style...
      trip_input_z13: { zIndex: 3, position: 'relative' },
      trip_input_z12: { zIndex: 2, position: 'relative' },
    }
    return (

<div className="widget_viaggio" style={styles.widget_viaggio}>
    <h2 className="title-1">
        <FormattedMessage
            id='calcolo percorsi'
            description='titolo del componente calcolo'
            defaultMessage='calcolo percorso'
        /></h2>
    <form className="trip_form" action="/#planner" onSubmit={this.handleSubmit}>

        <div className="trip_container">
            <ul>
                <li className="trip_input from" style={styles.trip_input_z13}>
                    <label htmlFor="trip_from"><FormattedMessage id='da' defaultMessage='da'/></label>
                    {/* <input type="text" value={this.state.trip_from} id="trip_from" name="trip_from" /> */}
                    <GeocodeSuggest id="trip_from" value={this.state.value_from}
                       onChange={this.onChangeFrom.bind(this)} onSuggestSelected={this.handleFromSelected.bind(this)} autoFocus={true}/>
                </li>
                <li className="trip_input to" style={styles.trip_input_z12}>
                    <label htmlFor="trip_to"><FormattedMessage id='a'/></label>
                    <GeocodeSuggest id="trip_to" value={this.state.value_to}
                      onChange={this.onChangeTo.bind(this)} onSuggestSelected={this.handleToSelected.bind(this)}/>
                </li>
            </ul>

            <button type="button" key="revbtn" tabIndex="-1" className="trip_input_switch" id="trip_switch" onClick={this.handleReverseBtn.bind(this)}></button>

        </div>

        <div className="trip_mode align_brother_bottom">
            <ul>
                <li className="public active" title={formatMessage({ id: 'Mezzi pubblici', defaultMessage: 'Mezzi pubblici' })}>
                    <input type="radio" id="tripmode_public" value="TRANSIT" className="public" name="otpMode" checked={this.state.otpMode == 'TRANSIT,WALK'} onChange={this.handleModeChanged.bind(null, 'TRANSIT,WALK')}/>
                    <label htmlFor="tripmode_public"><span></span>Mezzi pubblici</label>
                </li>
                <li className="car" title={formatMessage({ id: 'In auto' })}>
                    <input type="radio" id="tripmode_car" value="CAR" className="car" name="otpMode" checked={this.state.otpMode == 'CAR'} onChange={this.handleModeChanged.bind(null, 'CAR')}/>
                    <label htmlFor="tripmode_car"><span></span>In auto</label>
                </li>
                <li className="bike" title={formatMessage({ id: 'In bici' })}>
                    <input type="radio" id="tripmode_bike" value="BICYCLE" className="bike" name="otpMode" checked={this.state.otpMode == 'BICYCLE'} onChange={this.handleModeChanged.bind(null, 'BICYCLE')}/>
                    <label htmlFor="tripmode_bike"><span></span>In bici</label>
                </li>
                <li className="walk" title={formatMessage({ id: 'A piedi' })}>
                    <input type="radio" id="tripmode_walk" value="WALK" className="walk" name="otpMode" checked={this.state.otpMode == 'WALK'} onChange={this.handleModeChanged.bind(null, 'WALK')}/>
                    <label htmlFor="tripmode_walk"><span></span>A piedi</label>
                </li>
            </ul>
            <div className="trip_button_container">
              <button type="submit" id="otp-planner-optionsWidget-submit-button" className="btn_link trip_button"><FormattedMessage id='calcola'/></button>
            </div>
        </div>
    </form>

</div>

    )
  }
}

export default injectIntl(Calcolo)
