import React from 'react'
import Collapse from 'react-collapse'

import './page.scss';




const Pvova = React.createClass({
    getInitialState: function() {
      return {open:true, texts:['prova1', 'prova2','prova3']};
    },
    handleClick: function(){
        //console.log('open', this.state.open)
        this.setState({open:!this.state.open})
        //this.refs.textsBox.toggle()
    },

  render: function() {
      var textsNodes = this.state.texts.map(function(singleText, id){
        return (
            <li className="meteo_city accord_meteo_city" key={id} onClick={this.handleClick.bind(null,id)}><span className="city">{singleText}</span></li>
        )
        }.bind(this))
      //_springConfig={presets.wobbly}
      return (
          <div className="widget page">
              <h2 className="pageHeader" onClick={this.handleClick}>Pvova</h2>
              <Collapse isOpened={this.state.open} >

                  <ul class="meteo_cities accord_meteo_cities">
                      {textsNodes}

                      {/*
                      <li class="meteo_city accord_meteo_city"><span class="city">Alessandria</span></li>
                      <li class="meteo_city accord_meteo_city"><span class="city">Asti</span></li>
                      <li class="meteo_city accord_meteo_city"><span class="city">Biella</span></li>
                      <li class="meteo_city accord_meteo_city"><span class="city">Cuneo</span></li>
                      <li class="meteo_city accord_meteo_city"><span class="city">Novara</span></li>
                      <li class="meteo_city accord_meteo_city"><span class="city">Torino</span></li>
                      <li class="meteo_city accord_meteo_city"><span class="city">Verbania</span></li>
                      <li class="meteo_city accord_meteo_city"><span class="city">Vercelli</span></li>
                      */}
                </ul>
            </Collapse>
          </div>

      )
  }
})


export default Pvova
