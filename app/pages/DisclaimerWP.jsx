import React from 'react'
import './page.scss';
import axios from 'axios'
import lscache from 'lscache'


var DisclaimerWP = React.createClass({
    
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
        if(typeof this.state.page === 'undefined') {
			// Request our data again
			axios
                .get('http://wpmip.5t.torino.it/wp-json/wp/v2/pages?filter[name]=disclaimer')
				.then( (res) =>{
                    //console.log(res)
					this.setLocalState({
						page: res.data[0]
					})
				})
        }
	},
    
    
     render: function () {
         if ( ! this.state.page ) {
			return (
				<div className="loading-wrap">
					<div className="loading"><span className="fa fa-heart"></span> LOADING</div>
				</div>
			)
		}
         return(
    <div className="widget page">
        <h2 className="pageHeader" >{this.state.page.title.rendered}</h2>
        <div className="pageContent">
            
            <div className="entry-content" dangerouslySetInnerHTML={{__html: this.state.page.content.rendered}}></div>

        </div>
    </div>
)
    
}
})

module.exports = DisclaimerWP;

    
