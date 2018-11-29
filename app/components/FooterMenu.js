import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import config from '../configurations/config.js'

const FooterMenuItem = (props) => {
  return <li><Link to={props.url}>{props.title}</Link></li>
}

class FooterMenu extends React.Component {
  state = {
    footerMenu: config.footerMenu[this.props.currentLocale] || config.mainMenu.it,
  }

  render = () => {
    const footerMenuNodes = this.state.footerMenu.map((item, idx) => {
      return <FooterMenuItem key={idx} title={item.title} url={item.url} />
    })

    return (
      <nav className="footer-menu">
        <ul>{footerMenuNodes}</ul>
      </nav>
    )
  }
}

// mappo l' intl.locale dello state di redux sulla props currentLocale
const mapStateToProps = (state) => {
  return { currentLocale: state.intl.locale }
}

FooterMenu = connect(mapStateToProps)(FooterMenu)
export default FooterMenu
