import React from 'react';
import { Link } from 'react-router'
import axios from 'axios'
import lscache from 'lscache'

const FooterMenuItem = React.createClass({
  render: function() {
    return (
        <li><Link to={this.props.url}>{this.props.title}</Link></li>
    )
  }
})

const FooterMenu = React.createClass({
    
getInitialState: function () {
    console.log(this.constructor.displayName)
    // Check our localstorage cache, we may as well load from there if we have it
    return lscache.get(this.constructor.displayName) || {}
},

/**
 * Sets the localstorage state, and continues on to set the state of the React component
 */
setLocalState: function (data) {
    // Store in LocalStorage
    lscache.set(this.constructor.displayName, data, 10);
    // Store in Component State
    this.setState(data);
},
  
componentDidMount: function() {
    if(typeof this.state.footerMenu === 'undefined') {
        // Request our data again
        axios
            .get('http://wpmip.5t.torino.it/wp-json/wp-api-menus/v2/menus/3')
            .then( (res) =>{
                //console.log(res)
                this.setLocalState({
                    footerMenu: res.data
                })
            })
    }
    
},
    
render: function() {
        if ( ! this.state.footerMenu ) {
           return (
               <div className="loading-wrap">
                   <div className="loading"><span className="fa fa-heart"></span> LOADING</div>
               </div>
           )
        }
        
        var footerMenuNodes = this.state.footerMenu.items.map( function(item, idx){
            const baseurl="http://wpmip.5t.torino.it"
            const url = '/home/page'+item.url.slice(baseurl.length,-1)
            return(
                <FooterMenuItem key={idx} title={item.title} url={url}  />
            )
        }.bind(this))
        
        return (
            
            
            <nav className="footer-menu">
                <ul>
                    {footerMenuNodes}
                </ul>
            </nav>

        )
    }
})

module.exports = FooterMenu;
