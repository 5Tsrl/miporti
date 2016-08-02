import React from 'react';
import classNames from 'classnames';
import Collapse from 'react-collapse'
import {injectIntl, FormattedMessage} from 'react-intl'
import axios from 'axios'
import lscache from 'lscache'


var SelectorText = React.createClass({
  render: function() {

    var classes = classNames('btn_link meteo_here',  {open: this.props.open} )
    return (
        <span className={classes} onClick={this.props.onTextClick}>{this.props.text}</span>
    );
  }
});
var SelectorTexts = React.createClass({

  render: function() {
        var textsNodes = this.props.texts.map(function(singleText, id){
          return (
              <li className={singleText.Stato} key={id} ><span>{singleText.Nome}</span></li>
          )
        })
        return (
          <Collapse isOpened={this.props.open} >
            <ul className="elencoColli" >
                {textsNodes}
            </ul>
          </Collapse>
        )
  }
})
var Selector = React.createClass({
    getInitialState: function() {
      return {open:false}
    },
    handleTextClick: function(){
        this.setState({open:!this.state.open})
    },
    handleTextsClick: function(id){
        /*
        console.log('click su', id)
        this.setState({open:!this.state.open})
        this.refs.textsBox.toggle()
        this.setState({text: this.props.texts[id]})
        this.props.onTextIdChoosen(id)
        */
    },
    render: function() {
        return(
            <div>
                <SelectorText open={this.state.open} text={this.props.text} onTextClick={this.handleTextClick} />
                <SelectorTexts  open={this.state.open} texts={this.props.texts} onTextsClick={this.handleTextsClick}/>
            </div>
        )
    }

});



const Colli = React.createClass({

  getInitialState: function() {
      return lscache.get(this.constructor.displayName) || {colli: []}
  },
  
  /**
	 * Sets the localstorage state, and continues on to set the state of the React component
	 */
	setLocalState: function(data) {
		// Store in LocalStorage
		lscache.set(this.constructor.displayName, data, 2);
		// Store in Component State
		this.setState(data);
	},

  loadDataFromServer: function() {      
    axios
      .get(this.props.url)
      .then( (res) =>{
        this.setLocalState({colli: res.data})
      })
  },

  componentDidMount: function() {
    if(this.state.colli.length == 0) {
      this.loadDataFromServer()
      //setInterval(this.loadMeteoFromServer, this.props.pollInterval)
    }
  },
  componentWillUnmount: function() {
    //console.log('componente Colli smontato')    
  },

  render: function() {
    return (
        <div className="widget_imgbg">
            <h2 className="title-3"><FormattedMessage id='I colli alpini in piemonte'/></h2>
            <p><FormattedMessage id="Informazioni sull'apertura dei principali colli alpini piemontesi." /></p>
            <Selector texts={this.state.colli} text={this.props.intl.formatMessage({id:'Situazione colli alpini'})}/>
        </div>
    )
  }
})

export default injectIntl(Colli)
