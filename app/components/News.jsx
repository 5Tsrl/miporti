import React from 'react'
import axios from 'axios'
import lscache from 'lscache'
import ReactIScroll from 'react-iscroll'
import {FormattedDate, FormattedMessage} from 'react-intl';



var iScroll = require('iscroll/build/iscroll')

const Velina = React.createClass({
  render: function() {
    return (
        <li className="link_news">
            <div className="notizia">
                <h3>{this.props.title}</h3>
                <div dangerouslySetInnerHTML={{__html: this.props.description}} ></div>
                <span className="date_news"><span className="date">
                    <FormattedDate value={this.props.validitystart} day="numeric" month="long" year="numeric" />
                </span></span>
            </div>
        </li>
    )
  }
})


const News = React.createClass({

    getDefaultProps: function() {
        return ({
          options: {
            mouseWheel: true,
            //snap: true,
            scrollbars: 'custom',
            interactiveScrollbars: true,
            mouseWheel: true,
            disableMouse: true,
            preventDefaultException: { tagName:/.*/ }
          }
        })
    },

    getInitialState: function() {
      // Check our localstorage cache, we may as well load from there if we have it
      return lscache.get(this.constructor.displayName) || {news: []}
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

  componentDidMount: function() {
    if(this.state.news.length == 0) {
			axios
        .get('http://mip.5t.torino.it/news')
				.then( (res) =>{
          this.setLocalState({news: res.data})
			})
    }
	},

  render: function() {
      
    let velineNodes
    if ( this.state.news.length == 0 ) {
        velineNodes = (
          <li className="link_news">
              <div className="notizia">Notizie non disponibili</div>              
          </li>
        )
		}
    else {
        velineNodes = this.state.news.map( function(velina, idx){
            return(
                <Velina key={idx} title={velina.title} description={velina.description} validitystart={velina.validitystart} />
            )
        }.bind(this))
    }

    return(

    <div className="widget_news">
        <h2 className="title-2"><FormattedMessage id='Ultime news'/></h2>
        <div id="scroll_news">
          <ReactIScroll iScroll={iScroll} options={this.props.options}>
            <ul>
                {velineNodes}
            </ul>
        </ReactIScroll>
      </div>
    </div>

)}

})

export default News
