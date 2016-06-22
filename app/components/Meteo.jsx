
import React from 'react'
import {presets} from 'react-motion'
import Collapse from 'react-collapse'
import {FormattedMessage} from 'react-intl'
import classNames from 'classnames'
import axios from 'axios'




var SelectorText = React.createClass({
  render: function() {

    var classes = classNames('meteo_here accord_meteo_here',  {open: this.props.open} )
    return <span className={classes} onClick={this.props.onTextClick}>{this.props.text}</span>
  }
});

var SelectorTexts = React.createClass({

    render: function() {
        var textsNodes = this.props.texts.map((singleText, id) =>{
          return (
              <li className="meteo_city accord_meteo_city" key={id} onClick={this.props.onTextsClick.bind(null,id)}><span className="city">{singleText}</span></li>
          )
        })
        return (
        <Collapse className="meteo_cities" isOpened={this.props.open} >
            <ul>
                {textsNodes}
            </ul>
        </Collapse>
        )
  }
});

var Selector = React.createClass({
    getInitialState: function() {
      return {open:false, text:this.props.text};
    },
    handleTextClick: function(){
        this.setState({open:!this.state.open})
    },
    handleTextsClick: function(id){
        this.setState({open:!this.state.open})
        this.setState({text: this.props.texts[id]})
        this.props.onTextIdChoosen(id)
    },
    render: function() {
        return(
            <div>
                <SelectorText open={this.state.open} text={this.props.text} onTextClick={this.handleTextClick} />
                <SelectorTexts open={this.state.open} ref="textsBox" texts={this.props.texts} onTextsClick={this.handleTextsClick}/>
            </div>
        )
    }

});
var MeteoPanel = React.createClass({
  render: function() {

    var classes = classNames('meteo_img',  this.props.clima )
    return (
      <div>
        <div className="tab_container first_active meteo_now">
            <span className={classes}>{this.props.temperature}</span>
        </div>
        <p><FormattedMessage id='In collaborazione con '/><a href="https://www.arpa.piemonte.gov.it/" target="_blank">Arpa Piemonte</a></p>
      </div>

    );
  }
});
var MeteoDays = React.createClass({
  render: function() {
    var classesLiOggi = classNames('tab_label tab_left meteo_forecast meteo_today',{'tab_active': this.props.giornoAttivo == 'oggi' })
    var classesLiDomani = classNames( 'tab_label tab_right meteo_forecast meteo_tomorrow',{'tab_active': this.props.giornoAttivo == 'domani'} )
    var classesOggi = classNames('meteo_img',  this.props.clima)
    var classesDomani = classNames('meteo_img',  this.props.climaDomani)

    return (
        <ul className="tabs_label meteo_forecast_container">
            <li onClick={this.props.onDayChoosen.bind(null,'oggi')} className={classesLiOggi}><FormattedMessage id='oggi'/><span className={classesOggi}></span>{this.props.temperature}</li>
            <li  onClick={this.props.onDayChoosen.bind(null,'domani')} className={classesLiDomani}><FormattedMessage id='domani'/><span className={classesDomani}></span>{this.props.temperatureDomani}</li>
        </ul>
    );
  }
});

const Meteo = React.createClass({

    province : ['Alessandria', 'Asti', 'Biella', 'Cuneo', 'Novara', 'Torino', 'Verbania', 'Vercelli'],
    getInitialState: function() {
      return { giornoAttivo:'oggi', data: [], provId: 0, hover: false};
    },
    cambiaProvincia: function(){
        if(!this.state.hover){
            const newProvId = this.state.provId == this.province.length-1 ? 0 : this.state.provId + 1
            this.setState({provId: newProvId})
        }
    },
    toggleHover: function(){
        this.setState({hover: !this.state.hover})
    },

  loadMeteoFromServer: function() {
      axios
          .get(this.props.url)
          .then( (res) =>{
              this.setState({data: res.data})
          })
  },

  componentDidMount: function() {
    this.loadMeteoFromServer()
    const intervalId = setInterval(this.cambiaProvincia, 6*1000)
    this.setState({intervalId: intervalId})
    //setInterval(this.loadMeteoFromServer, this.props.pollInterval);
  },

  componentWillUnmount: function(){
    clearInterval(this.state.intervalId);
  },

  handleSceltaProvincia: function(provId){
      var provin = this.state.data.find(function(el){return el.id === provId})
      this.setState({provId: provin.id})
      clearInterval(this.state.intervalId)
},
  handleSceltaGiorno: function(giorno){
      console.log('giorno', giorno)
      this.setState({giornoAttivo : giorno})

  },
  render: function() {
      var temperature, temperatureDomani, temperaturePanel, clima, climaDomani, climaPanel = ''
      if(this.state.data.length>1){
          temperature = this.state.data[this.state.provId].oggi.temperature
          temperatureDomani = this.state.data[this.state.provId].domani.temperature
          temperaturePanel =  this.state.data[this.state.provId][this.state.giornoAttivo].temperature
          clima= this.state.data[this.state.provId].oggi.meteoImg
          climaDomani= this.state.data[this.state.provId].domani.meteoImg
          climaPanel= this.state.data[this.state.provId][this.state.giornoAttivo].meteoImg

      }
    return (

        <div className="widget_meteo accord_widget_meteo" onMouseEnter={this.toggleHover} onMouseLeave={this.toggleHover}>
            <h2>Meteo</h2>
            <Selector texts={this.province} text={this.province[this.state.provId]} onTextIdChoosen={this.handleSceltaProvincia}/>
            <MeteoPanel temperature={temperaturePanel} clima={climaPanel}/>
            <MeteoDays giornoAttivo={this.state.giornoAttivo} temperature={temperature} clima={clima} temperatureDomani={temperatureDomani} climaDomani={climaDomani} onDayChoosen={this.handleSceltaGiorno}/>
      </div>

    );
  }

})
export default Meteo
