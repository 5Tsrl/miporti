import React from 'react'
import GeocodeSuggest from './calcolo/GeocodeSuggest'

import './calcolo/calcolo.scss';


const Calcolo = React.createClass({
    getInitialState: function(){
            return {otpMode: 'TRANSIT', value_from: '', value_to:'', coord_from:'', coord_to:''}
    },
    handleModeChanged: function(mode){
        console.log('changiato', mode)
        this.setState({otpMode: mode})
    },
    onChangeFrom: function(event, { newValue }) {
      this.setState({value_from: newValue});
    },
    onChangeTo: function(event, { newValue }) {
      this.setState({value_to: newValue});
    },
    
    handleReverseBtn: function(e){
        e.preventDefault()
        console.log('invertito')
        const value_from_tmp = this.state.value_from;
        const coord_from_tmp = this.state.coord_from;
        this.setState({value_from: this.state.value_to, coor_from: this.state.coord_to, value_to: value_from_tmp, coord_to: coord_from_tmp})
    },
    handleFromSelected: function(suggestion){
      this.setState({value_from: suggestion.properties.hint })
      this.setState({coord_from: '::'+suggestion.geometry.coordinates[1]+','+suggestion.geometry.coordinates[0]})

    },
    handleToSelected: function(suggestion){
      this.setState({value_to: suggestion.properties.hint  })
      this.setState({coord_to: '::'+suggestion.geometry.coordinates[1]+','+suggestion.geometry.coordinates[0]})

    },
    handleSubmit: function(e){
        e.preventDefault()
        console.log('submittato')
        var params = {
            module: 'planner',
            fromPlace: this.state.value_from + this.state.coord_from,
            toPlace: this.state.value_to +   this.state.coord_to,
            mode: this.state.otpMode
        }
        var queryString = Object.keys(params).map(function(k){return encodeURIComponent(k) +'=' + encodeURIComponent(params[k])}).join('&')
        console.log(queryString)
        location.href='/#planner?'+queryString
        
    },
    render: function() {
        
        const styles = {
          widget_viaggio: {color: '#fff'},//esempio di inline style...
          ulStyle: {zIndex: 0},
          trip_input_z13: {zIndex: 13, position: 'relative'},
          trip_input_z12: {zIndex: 12, position: 'relative'},
        }
        return(
        
<div className="widget widget_viaggio" style={styles.widget_viaggio}>
    <h2 className="title-1">calcolo percorsi</h2>
    <form className="trip_form" action="/#planner" onSubmit={this.handleSubmit}>
        
        <div className="trip_container">
            <ul style={styles.ulStyle}>
                <li className="trip_input" style={styles.trip_input_z13}>
                    <label htmlFor="trip_from">da</label>
                    {/* <input type="text" value={this.state.trip_from} id="trip_from" name="trip_from" /> */}
                    <GeocodeSuggest id="trip_from" value={this.state.value_from} onChange={this.onChangeFrom} onSuggestSelected={this.handleFromSelected}/>
                </li>
                <li className="trip_input" style={styles.trip_input_z12}>
                    <label htmlFor="trip_to">a</label>
                    <GeocodeSuggest id="trip_to" value={this.state.value_to}  onChange={this.onChangeTo} onSuggestSelected={this.handleToSelected}/>
                </li>
            </ul>
            
            <button className="trip_input_switch" id="trip_switch" onClick={this.handleReverseBtn}></button>
            
        </div>

        <div className="trip_mode align_brother_bottom">
            <ul>
                <li className="public active" title="Mezzi pubblici">
                    <input type="radio" id="tripmode_public" value="TRANSIT" className="public" name="otpMode"   checked={this.state.otpMode == 'TRANSIT'} onChange={this.handleModeChanged.bind(null,'TRANSIT')}/>
                    <label htmlFor="tripmode_public"><span></span>Mezzi pubblici</label>
                </li>
                <li className="car" title="In auto">
                    <input type="radio" id="tripmode_car" value="CAR" className="car" name="otpMode" checked={this.state.otpMode == 'CAR'} onChange={this.handleModeChanged.bind(null,'CAR')}/>
                    <label htmlFor="tripmode_car"><span></span>In auto</label>
                </li>
                <li className="bike" title="In bici">
                    <input type="radio" id="tripmode_bike" value="BICYCLE" className="bike" name="otpMode" checked={this.state.otpMode == 'BICYCLE'}  onChange={this.handleModeChanged.bind(null,'BICYCLE')}/>
                    <label htmlFor="tripmode_bike"><span></span>In bici</label>
                </li>
                <li className="walk" title="A piedi">
                    <input type="radio" id="tripmode_walk" value="WALK" className="walk" name="otpMode" checked={this.state.otpMode == 'WALK'}  onChange={this.handleModeChanged.bind(null,'WALK')}/>
                    <label htmlFor="tripmode_walk"><span></span>A piedi</label>
                </li>
            </ul>
            <div className="trip_button_container">
                <button id="otp-planner-optionsWidget-submit-button" className="btn_link trip_button" type="submit">Calcola</button>
            </div>
        </div>
    </form>
        
</div>
  
  )}
 
})

export default Calcolo