
import React from 'react';
import classNames from 'classnames';




var SelectorText = React.createClass({
  render: function() {
    
    var classes = classNames('meteo_here accord_meteo_here',  {open: this.props.open} )
    return (
        <span className={classes} onClick={this.props.onTextClick}>{this.props.text}</span>
    );
  }
});
var SelectorTexts = React.createClass({
    makeTogglable: function(domEl) {
      var element = $(domEl);

      this.toggle = function() {
        element.slideToggle();
      };
    },

  render: function() {
        var textsNodes = this.props.texts.map(function(singleText, id){
          return (
              <li className="meteo_city accord_meteo_city" key={id} onClick={this.props.onTextsClick.bind(null,id)}><span className="city">{singleText}</span></li>
          )
      }.bind(this))
        var classes = classNames('meteo_cities accord_meteo_cities')
        return (
            <ul ref={this.makeTogglable} className={classes}>
                {textsNodes}
            </ul>
        );
  }
});
var Selector = React.createClass({
    getInitialState: function() {
      return {open:false, text:this.props.text};
    },
    handleTextClick: function(){
        //console.log('open', this.state.open)
        this.setState({open:!this.state.open})
        this.refs.textsBox.toggle()
    },
    handleTextsClick: function(id){
        //console.log('click', id)
        this.setState({open:!this.state.open})
        this.refs.textsBox.toggle()
        this.setState({text: this.props.texts[id]})
        this.props.onTextIdChoosen(id)
    },
    render: function() {
        return(
            <div>
                <SelectorText open={this.state.open} text={this.state.text} onTextClick={this.handleTextClick} />
                <SelectorTexts ref="textsBox" texts={this.props.texts} onTextsClick={this.handleTextsClick}/>
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
        <p>In collaborazione con <a href="https://www.arpa.piemonte.gov.it/" target="_blank">Arpa Piemonte</a></p>
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
            <li onClick={this.props.onDayChoosen.bind(null,'oggi')} className={classesLiOggi}>oggi<span className={classesOggi}></span>{this.props.temperature}</li>
            <li  onClick={this.props.onDayChoosen.bind(null,'domani')} className={classesLiDomani}>domani<span className={classesDomani}></span>{this.props.temperatureDomani}</li>
        </ul>
    );
  }
});

 //class Meteo extends React.Component {
const Meteo = React.createClass({
    province : ['Alessandria', 'Asti', 'Biella', 'Cuneo', 'Novara', 'Torino', 'Verbania', 'Vercelli'],
    getInitialState: function() {
      return { giornoAttivo:'oggi', data: [], provId: 0};
    },
    
  loadMeteoFromServer: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: true,
      success: function(data) {
        this.setState({data: data});
        
    }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  
  componentDidMount: function() {
    this.loadMeteoFromServer();
    //setInterval(this.loadMeteoFromServer, this.props.pollInterval);
  },
  handleSceltaProvincia: function(provId){
      var provin = this.state.data.find(function(el){return el.id === provId})
      this.setState({provId: provin.id})
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
        
        <div className="widget widget_meteo accord_widget_meteo">
            <h2>Meteo</h2>
            <Selector texts={this.province} text={this.province[this.state.provId]} onTextIdChoosen={this.handleSceltaProvincia}/>
            <MeteoPanel temperature={temperaturePanel} clima={climaPanel}/>
            <MeteoDays giornoAttivo={this.state.giornoAttivo} temperature={temperature} clima={clima} temperatureDomani={temperatureDomani} climaDomani={climaDomani} onDayChoosen={this.handleSceltaGiorno}/>
      </div>
     
    );
  }

})
export default Meteo

