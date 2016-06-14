import React from 'react'
import axios from 'axios'
import lscache from 'lscache'
import ReactIScroll from 'react-iscroll'
import {FormattedDate} from 'react-intl';



var iScroll = require('iscroll/build/iscroll')

const Velina = React.createClass({
  render: function() {
    return (
        <li className="link_news">
            <a href="#">
                <h3>{this.props.title}</h3>
                <div dangerouslySetInnerHTML={{__html: this.props.description}} ></div>
                <span className="date_news"><span className="date">
                    <FormattedDate value={this.props.validitystart} day="numeric" month="long" year="numeric" />
                </span></span>
            </a>
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
        console.log(this.constructor.displayName)
		// Check our localstorage cache, we may as well load from there if we have it
        return lscache.get(this.constructor.displayName) || {}
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
        if(typeof this.state.news === 'undefined') {
			// Request our data again
			axios
                .get('http://mip.5t.torino.it/news')
				.then( (res) =>{
                    console.log(res)
					this.setLocalState({
						news: res.data
					})
				})
        }
	}, 
        
    render: function() {
        if ( ! this.state.news ) {
			return (
                <ul>
                    <li className="link_news">
                        <a href="#">
                            <h3>Caricamento...</h3>
                        </a>
                    </li>
                </ul>
            )
		}
        
        
        var velineNodes = this.state.news.map( function(velina, idx){
            return(
                <Velina key={idx} title={velina.title} description={velina.description} validitystart={velina.validitystart} />
            )
        }.bind(this))
        
        
        return(

    <div className="widget_news">
        <h2 className="title-2">Ultime news</h2>
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