import React from 'react'
import { connect} from 'react-redux'
import {update} from 'react-intl-redux'
import { Link } from 'react-router'
import axios from 'axios'
import lscache from 'lscache'
import classNames from 'classnames';

import messages_en   from '../messages/en.js'
import messages_it   from '../messages/it.js'


const MenuItem = React.createClass({
    
  render: function() {
      //console.log(this.props.url)
    if(this.props.external)
        return <li><a href={this.props.url} onClick={this.props.handleClick}>{this.props.title}</a></li>    
    else
        return <li><Link to={this.props.url} activeClassName="active" onClick={this.props.handleClick}>{this.props.title}</Link></li>
        //return <li><a href={this.props.url}  onClick={this.props.handleClick}>{this.props.title}</a></li>
  }
})

const LangItem = React.createClass({
  render: function() {
      const classes = classNames( {current_lang: this.props.isCurrentLang})
      return(      
          <li><Link to='/' onClick={this.props.handleLangClick.bind(null,this.props.lang)} className={classes} >{this.props.lang}</Link></li>
      )
  }
})


let Menu = React.createClass({
    
getDefaultProps: function() {
    return {
      langs: ['it', 'en']      
    }
  },    
getInitialState: function () {
    
    // Check our localstorage cache, we may as well load from there if we have it
    return  { menuIsOpen: false, 
              menu: lscache.get(`menu_${this.props.currentLocale}`)
            }
},


loadMenu: function() {
        let menuId = 4 //it
        if(this.props.currentLocale == 'en') menuId=5
        
        axios
            .get('https://www.muoversinpiemonte.it/wp-json/wp-api-menus/v2/menus/'+menuId)
            .then( (res) =>{
                console.log('scaricato', `menu_${this.props.currentLocale}`)
                this.setState({menu: res.data})
                lscache.set(`menu_${this.props.currentLocale}`,res.data,5)                
            })    
},
  

componentDidMount: function() {
    // Detects Touch or noTouch devices
	if(!!('ontouchstart' in window)){ //check for touch device
        document.body.classList.add('touch')
	} else{ //behaviour and events for pointing device like mouse
        document.body.classList.add('no-touch')
	}

    if(this.state.menu == null) {
        this.loadMenu()
    }
},

handleClick: function() {
    this.setState({menuIsOpen: !this.state.menuIsOpen}, () =>{
        document.body.classList.toggle('menu-open', this.state.menuIsOpen)
    })
},
handleLangClick: function(locale){
    //event.preventDefault()
    
    let messages = {}
        if(locale == 'it'){
            messages=messages_it
        }else {
            messages=messages_en            
        }
    this.props.dispatch(update({
        locale,
        messages,
      }))
    lscache.set('preferredLocale', locale /*, 60*/)
    document.cookie = 'i18next='+locale+';domain=muoversinpiemonte.it;path=/'
},

    
render: function() {
    if ( ! this.state.menu ) {
       var menuNodes = <MenuItem title='home' url='/'  handleClick={this.handleClick} />
   }else{
    
        var menuNodes = this.state.menu.items.map( (item, idx) =>{
            let url = ''
            const baseurlWP="http://wpmip.5t.torino.it"
            const baseurlMip="http://mip.muoversinpiemonte.it"
            if(item.url.indexOf(baseurlWP) >=0){
                //pagine wordpress
                url = '/page'+item.url.slice(baseurlWP.length,-1)
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
        })
    }
    
    const langNodes = this.props.langs.map( (item, idx) =>{         
         const isCurrentLang = (item == this.props.currentLocale)
         return <LangItem  key={idx} lang={item} isCurrentLang={isCurrentLang}  handleLangClick={this.handleLangClick} />
    })
    
    
    
    return (
<div>
    <nav className="main-menu-container" id="main-menu-container">
        <ul className="main-menu-5t" id="main-menu-5t">
            {menuNodes}
        </ul>
        <div className="language-switcher" id="language-switcher">
            <ul>
                {langNodes}
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
//mappo l' intl.locale dello state di redux sulla props currentLocale
function mapStateToProps(state) {
  return { currentLocale: state.intl.locale }
}

Menu = connect(mapStateToProps)(Menu)
export default Menu
