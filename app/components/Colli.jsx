import React from 'react';
import classNames from 'classnames';
import Collapse from 'react-collapse'
import {injectIntl, FormattedMessage} from 'react-intl'
import axios from 'axios'
import lscache from 'lscache'

const SelectorText = (props) => {
    var classes = classNames('btn_link meteo_here',  {open: props.open} )
    return <span className={classes} onClick={props.onTextClick}>{props.text}</span>
}

const SelectorTexts = (props) => {
  if(!props.texts) {
    return <Collapse isOpened={props.open} ><ul className="elencoColli" ></ul></Collapse>
  }
  const textsNodes = props.texts.map(function(singleText, id){
      return <li className={singleText.Stato} key={id} ><span>{singleText.Nome}</span></li>
  })
  return (
    <Collapse isOpened={props.open} >
      <ul className="elencoColli" >
          {textsNodes}
      </ul>
    </Collapse>
  )
}

class Selector extends React.Component {
  state = {open:false}
  handleTextClick = (e) =>{
    this.setState({open:!this.state.open})
  }
  handleTextsClick(){}
  render() {
    return  <div>
                <SelectorText open={this.state.open} text={this.props.text} onTextClick={this.handleTextClick} />
                <SelectorTexts  open={this.state.open} texts={this.props.texts} onTextsClick={this.handleTextsClick}/>
            </div>
    }
}

class Colli extends React.Component {
  state = lscache.get('colli') || {colli: []}

  /**
	 * Sets the localstorage state, and continues on to set the state of the React component
	 */
	setLocalState(data) {
		// Store in LocalStorage
		lscache.set('colli', data, 2);
		// Store in Component State
		this.setState(data);
	}

  loadDataFromServer = () => {      
    axios
      .get(this.props.url)
      .then( (res) =>{
        this.setLocalState({colli: res.data})
      })
  }

  componentDidMount = () => {
    if(this.state.colli.length == 0) {
      this.loadDataFromServer()
    }
  }
  
  render() {
    return <div className="widget_imgbg">
            <div className="centra">
              <h2 className="title-3"><FormattedMessage id='I colli alpini in piemonte'/></h2>
              <p><FormattedMessage id="Informazioni sull'apertura dei principali colli alpini piemontesi." /></p>
              <Selector texts={this.state.colli} text={this.props.intl.formatMessage({id:'Situazione colli alpini'})}/>
            </div>
          </div>
    
  }
}

export default injectIntl(Colli)
