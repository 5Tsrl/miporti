import React from 'react'
import { connect} from 'react-redux'
import {update} from 'react-intl-redux'
import { NavLink } from 'react-router-dom'
import axios from 'axios'
import lscache from 'lscache'
import classNames from 'classnames';

import messages_en   from '../messages/en.js'
import messages_it   from '../messages/it.js'


const MenuItem = (props) => {
  if (props.external) {
    return (<li><a href={props.url} onClick={props.handleClick}>{props.title}</a></li>)
  }
  else {
    return <li><NavLink to={props.url}  onClick={props.handleClick}>{props.title}</NavLink></li>
  }
}

const LangItem = (props) => {
  const classes = classNames( {current_lang: props.isCurrentLang})
  return(
      <li><NavLink to='/' onClick={props.handleLangClick.bind(null,props.lang)} className={classes} >{props.lang}</NavLink></li>
  )
}

class Menu extends React.Component {

  state = {
    menuIsOpen: false,
    menu: lscache.get(`menu_${this.props.currentLocale}`),
    langs: ['it', 'en']
  }


  loadMenu = () => {
    let menuId = 4 //it
    if(this.props.currentLocale == 'en') menuId=5

    axios
      .get('/wp-json/wp-api-menus/v2/menus/' + menuId)
      .then( (res) =>{
          console.log('scaricato', `menu_${this.props.currentLocale}`)
          this.setState({menu: res.data})
          lscache.set(`menu_${this.props.currentLocale}`,res.data,5)
      })
  }


  componentDidMount = () => {
    // Detects Touch or noTouch devices
    if(!!('ontouchstart' in window)){ //check for touch device
      document.body.classList.add('touch')
    } else{ //behaviour and events for pointing device like mouse
      document.body.classList.add('no-touch')
    }

    if(this.state.menu == null) {
      this.loadMenu()
    }
  }

  handleClick = () => {
    this.setState({menuIsOpen: !this.state.menuIsOpen}, () =>{
      document.body.classList.toggle('menu-open', this.state.menuIsOpen)
    })
  }

  handleLangClick = (locale) => {
    //event.preventDefault()
    console.log('cliccato con locale = ', locale)
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
    //chiude menu su mobile
    if(this.state.menuIsOpen){
      this.setState({menuIsOpen:false}, document.body.classList.remove('menu-open'))
    }

    lscache.set('preferredLocale', locale /*, 60*/)
    document.cookie = 'i18next='+locale+';domain=muoversinpiemonte.it;path=/'
  }

  render = () => {
    if ( ! this.state.menu ) {
       var menuNodes = <MenuItem title='home' url='/'  handleClick={this.handleClick} />
    }else{

      var menuNodes = this.state.menu.items.map( (item, idx) => {
        let url = ''
        //qs url arrivano da wp
        const baseurlWP="http://wpmip.5t.torino.it"
        const baseurlMip="https://www.muoversinpiemonte.it"
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

    const langNodes = this.state.langs.map( (item, idx) =>{
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
}

//mappo l' intl.locale dello state di redux sulla props currentLocale
function mapStateToProps(state) {
  return { currentLocale: state.intl.locale }
}

Menu = connect(mapStateToProps)(Menu)
export default Menu
