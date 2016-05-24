import React from 'react';
import classNames from 'classnames';

var SelectorText = React.createClass({
  render: function() {
    
    var classes = classNames('btn_link meteo_here accord_meteo_here',  {open: this.props.open} )
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
              <li className={singleText.stato} key={id} ><span className="city">{singleText.nome}</span></li>
          )
      }.bind(this))
        return (
            <ul ref={this.makeTogglable} className="elencoColli">
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
        /*
        this.setState({open:!this.state.open})
        this.refs.textsBox.toggle()
        this.setState({text: this.props.texts[id]})
        this.props.onTextIdChoosen(id)
        */
    },
    render: function() {
        return(
            <div>
                <SelectorText open={this.state.open} text={this.state.text} onTextClick={this.handleTextClick} />
                <SelectorTexts ref="textsBox" colli={this.props.colli} texts={this.props.texts} onTextsClick={this.handleTextsClick}/>
            </div>
        )
    }
    
});



const Colli = React.createClass({
    
    getInitialState: function() {
      return {  colli: []};
    },
    
  loadDataFromServer: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: true,
      success: function(data) {
        this.setState({colli: data});
    }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  
  componentDidMount: function() {
    this.loadDataFromServer();
    //setInterval(this.loadMeteoFromServer, this.props.pollInterval);
  },
 
  render: function() {
       
      var elenco = []
      if(typeof this.state.colli !== 'undefined'){
         
         this.state.colli.map(function(colle){
             elenco.push(colle.nome)
         })
         
      }
    return (
        
        <div className="widget widget_imgbg">
            <h2 className="title-3">I colli alpini in piemonte</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            <Selector texts={this.state.colli}  colli={this.state.colli} text="Situazione colli alpini" />
      </div>
    );
  }
});

export default Colli





