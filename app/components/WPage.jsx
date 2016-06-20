import React from 'react'
import './page.scss';
import axios from 'axios'
import lscache from 'lscache'


var WPage = React.createClass({
    
	getInitialState: function() {
        console.log(this.constructor.displayName)
        
		// Check our localstorage cache, we may as well load from there if we have it
        return { pages: lscache.get('pages') || {} }
	},

	/**
	 * Sets the localstorage state, and continues on to set the state of the React component
	 */
     setLocalState: function(key, value) {
        let newPages =  Object.assign({},this.state.pages )
        newPages[key] = value
        this.setState({ pages: newPages });
        lscache.set('pages',this.state.pages , 2);
    },

    getPageContent: function(slug){
            axios
                .get('http://mip.5t.torino.it/wp-json/wp/v2/pages?filter[name]=' + slug)
                .then( (res) =>{
                    this.setLocalState(slug, res.data[0])
                })
    },

    componentDidMount: function() {
    },
    
render: function () {
    const slug = this.props.routeParams.slug
     
    if ( ! this.state.pages[slug] ) {
        this.getPageContent(slug)
    
	return (
<div className="widget page">
    <h2 className="pageHeader" >...</h2>
    <div className="pageContent">        
        <div className="entry-content">...</div>
    </div>
</div>            
		)
	}
    return(
<div className="widget page">
    <h2 className="pageHeader" >{this.state.pages[slug].title.rendered}</h2>
    <div className="pageContent">        
        <div className="entry-content" dangerouslySetInnerHTML={{__html: this.state.pages[slug].content.rendered}}></div>
    </div>
</div>
    )
    
  }
})

module.exports = WPage