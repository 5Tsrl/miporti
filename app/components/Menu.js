import React from 'react'
import { connect } from 'react-redux'
import { updateIntl } from 'react-intl-redux'
import { NavLink } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import lscache from 'lscache'
import classNames from 'classnames';

import messages_en from '../messages/en.js'
import messages_it from '../messages/it.js'
import config from '../configurations/menus.js'

const MenuItem = (props) => {
  if (/^https?:\/\//.test(props.url)) {
    return (<li><a href={props.url} onClick={props.handleClick}>{props.title}</a></li>)
  }
  // activeClassName="active" di default! funge perchè i parents hanno passato props.param.match
  return (<li><NavLink exact to={props.url} onClick={props.handleClick}>{props.title}</NavLink></li>)
}

const LangItem = (props) => {
  const classes = classNames({ current_lang: props.isCurrentLang })
  return (
      <li><NavLink to='/' onClick={props.handleLangClick.bind(null, props.lang)} className={classes} >{props.lang}</NavLink></li>
  )
}

class Menu extends React.Component {
  state = {
    menu: config.mainMenu[this.props.currentLocale] || config.mainMenu.it,
    menuIsOpen: false,
    langs: ['it', 'en'],
  }

  componentDidMount = () => {
    // Detects Touch or noTouch devices
    if (!!('ontouchstart' in window)) { // check for touch device
      document.body.classList.add('touch')
    } else { // behaviour and events for pointing device like mouse
      document.body.classList.add('no-touch')
    }
  }

  handleClick = () => {
    this.setState({ menuIsOpen: !this.state.menuIsOpen }, () => {
      document.body.classList.toggle('menu-open', this.state.menuIsOpen)
    })
  }

  handleLangClick = (locale) => {
    // console.log('cliccato con locale = ', locale)
    let messages = {}
    if (locale === 'it') {
      messages = messages_it
    } else {
      messages = messages_en
    }
    // console.log('locale', locale)
    // console.log('messages', messages)
    this.props.updateIntl(locale, messages)
    // chiude menu su mobile
    if (this.state.menuIsOpen) {
      this.setState({ menuIsOpen: false }, document.body.classList.remove('menu-open'))
    }

    lscache.set('preferredLocale', locale /* , 60 */)
    document.cookie = `i18next=${locale};domain=muoversinpiemonte.it;path=/`
  }

  render = () => {
    const menuNodes = this.state.menu.map((item, idx) => {
      return (
          <MenuItem key={idx} title={item.title} url={item.url} handleClick={this.handleClick.bind(this)} {...this.props} />
      )
    })

    const langNodes = this.state.langs.map((item, idx) => {
      const isCurrentLang = (item === this.props.currentLocale)
      return (
        <LangItem key={idx} lang={item} isCurrentLang={isCurrentLang} handleLangClick={this.handleLangClick} />
      )
    })

    return (
      <React.Fragment>
        <Helmet>
          <html lang={this.props.currentLocale || 'it'} />
        </Helmet>
        <nav className="main-menu-container">
          <ul className="main-menu-5t">
            {menuNodes}
          </ul>
          <div className="language-switcher">
            <ul>
              {langNodes}
            </ul>
          </div>
        </nav>
        <span id="nav-toggle" onClick={this.handleClick}>
          <span className="icon"> <span></span></span>
        </span>
      </React.Fragment>

    )
  }
}

// mappo l' intl.locale dello state di redux sulla props currentLocale
const mapStateToProps = (state) => {
  return { currentLocale: state.intl.locale }
}
const mapDispatchToProps = (dispatch) => {
  return {
    updateIntl: (locale, messages) => dispatch(updateIntl({
      locale,
      messages,
    })),
  }
}

Menu = connect(mapStateToProps, mapDispatchToProps)(Menu)
export default Menu
