import React, {useContext, useState, useEffect} from 'react'
import { NavLink } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import classNames from 'classnames'
import {IntlContext} from './IntlWrapper'
import menus from '../configurations/menus.js'


const MenuItem = (props) => {
  // se url esterno (es: https://map.muoversinpiemonte.it) ritorno <a href=  altrimenti <NavLink
  if (/^https:/.test(props.url)) {
    return (<li><a href={props.url} onClick={props.handleClick}>{props.title}</a></li>)
  }

  // <NavLink> is really just a simple example of how to build a link that knows whether or not it is "active" by matching the beginning of the URL pathname.
  return (<li><NavLink  to={props.url} onClick={props.handleClick}>{props.title}</NavLink></li>)
}

const LangItem = (props) => {
  const classes = classNames({ current_lang: props.isCurrentLang })
  return (
      <li><NavLink to='/' onClick={props.handleLangClick.bind(null, props.lang)} className={classes} >{props.lang}</NavLink></li>
  )
}


const Menu = (props) => {

  const intlContext = useContext(IntlContext) // prendo in context dichiarato in IntlWrapper

  useEffect(() => {

    // Detects Touch or noTouch devices
    if (!!('ontouchstart' in window)) { // check for touch device
      document.body.classList.add('touch')
    } else { // behaviour and events for pointing device like mouse
      document.body.classList.add('no-touch')
    }
  }, [])

  const [menuIsOpen, setMenuIsOpen] = useState(false)

  const langs = ['it', 'en']

  const handlePaninoClick = () => {
    setMenuIsOpen(value => !value)  // toggle panino
    document.body.classList.toggle('menu-open', !menuIsOpen)
  }

  const handleMenuItemClick = () => {
    // su mobile, se aperto, chiude menu
    if (!!menuIsOpen) {
      handlePaninoClick()
    }
  }

  const handleLangClick = (locale) => {
    intlContext.selectLanguage(locale)

    // su mobile, se aperto, chiude menu
    if (!!menuIsOpen) {
      handlePaninoClick()
    }
  }

  const menuNodes = menus.mainMenu[intlContext.locale].map((item, idx) => {
    return (
        <MenuItem key={idx} title={item.title} url={item.url} handleClick={handleMenuItemClick} />
    )
  })

  const langNodes = langs.map((item, idx) => {

    const isCurrentLang = (item === intlContext.locale)
    return (
      <LangItem key={idx} lang={item} isCurrentLang={isCurrentLang} handleLangClick={handleLangClick} />
    )
  })

  return (
    <>
      <Helmet>
        <html lang={intlContext.locale || 'it'} />
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
      <span id="nav-toggle" onClick={handlePaninoClick}>
        <span className="icon"> <span></span></span>
      </span>
    </>
  )

}
export default Menu
