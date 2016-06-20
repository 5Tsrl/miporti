import React from 'react';
import { Link } from 'react-router'
import axios from 'axios'
import lscache from 'lscache'

const MenuItem = React.createClass({
  render: function() {
    if(this.props.external){
        return <li><a href={this.props.url} activeClassName="active" onClick={this.props.handleClick}>{this.props.title}</a></li>    
    } else
        return <li><Link to={this.props.url} activeClassName="active" onClick={this.props.handleClick}>{this.props.title}</Link></li>
    
  }
})


const Menu = React.createClass({
        
getInitialState: function () {
    console.log(this.constructor.displayName)
    // Check our localstorage cache, we may as well load from there if we have it
    const initialState = {menuIsOpen: false}
    return Object.assign(lscache.get(this.constructor.displayName) || {}, initialState)
},
/**
 * Sets the localstorage state, and continues on to set the state of the React component
 */
setLocalState: function (data) {
    // Store in LocalStorage
    lscache.set(this.constructor.displayName, data, 1);
    // Store in Component State
    this.setState(data);
},
  

componentDidMount: function() {
    // Detects Touch or noTouch devices
	if(!!('ontouchstart' in window)){ //check for touch device
		//$('body').addClass('touch');
        document.body.classList.add('touch')
	} else{ //behaviour and events for pointing device like mouse
		//$('body').addClass('no-touch');
        document.body.classList.add('no-touch')
	}
    document.body.classList.toggle('menu-open', this.state.menuIsOpen)
    if(typeof this.state.menu === 'undefined') {
        // Request our data again
        axios
            .get('http://mip.5t.torino.it/wp-json/wp-api-menus/v2/menus/4')
            .then( (res) =>{
                //console.log(res)
                this.setLocalState({
                    menu: res.data
                })
            })
    }
},

handleClick: function() {
    this.setState({menuIsOpen: !this.state.menuIsOpen}, () =>{
        document.body.classList.toggle('menu-open', this.state.menuIsOpen)
    })    
},
    
render: function() {
    if ( ! this.state.menu ) {
       return (
           <div className="loading-wrap">
               <div className="loading"><span className="fa fa-heart"></span> LOADING</div>
           </div>
       )
    }
    
    var menuNodes = this.state.menu.items.map( function(item, idx){
        let url = ''
        const baseurlWP="http://wpmip.5t.torino.it"
        const baseurlMip="http://mip.5t.torino.it"
        if(item.url.indexOf(baseurlWP) >=0){
            //pagine wordpress
            url = '/home/page'+item.url.slice(baseurlWP.length,-1)
        } else {
            //pagine otp + home
            url = item.url
            var external=true
            if (item.title == 'Home'){
                external=false
                url = item.url.slice(baseurlMip.length)             
            }            
        }
        return(
            <MenuItem key={idx} title={item.title} url={url} external={external} handleClick={this.handleClick} />
        )
    }.bind(this))
    
    return (
<div>
    <nav className="main-menu-container" id="main-menu-container">
        <ul className="main-menu-5t" id="main-menu-5t">
            {menuNodes}
        </ul>
        <div className="language-switcher" id="language-switcher">
            <ul>
                <li><a href="?setLng=it" className="current_lang">it</a></li>
                <li><a href="?setLng=en">en</a></li>
            </ul>
        </div>
    </nav>
    <span id="nav-toggle" onClick={this.handleClick}>
        <span className="icon"> <span></span></span>
    </span>    
</div>

        )
    }
})

export default Menu
