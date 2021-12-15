import React, {useContext} from 'react'
import { Link } from 'react-router-dom'

import {IntlContext} from './IntlWrapper'
import config from '../configurations/menus.js'


const FooterMenu = props => {

  const intlContext = useContext(IntlContext)

  const footerMenu = config.footerMenu[intlContext.locale]

  const footerMenuNodes = footerMenu.map((item, idx) => {
    return <li key={idx}><Link to={item.url}>{item.title}</Link></li>
  })

  return (
    <nav className="footer-menu">
      <ul>{footerMenuNodes}</ul>
    </nav>
  )

}
export default FooterMenu
