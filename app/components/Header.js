import React from 'react'
import { Link } from 'react-router-dom'
import Menu from './Menu'
import LogoMip from '../images/logo-mip.svg'
import LogoRegione from '../images/logo-regione-piemonte.svg'

const Header = props => (

    <header className="clearfix header" id="branding">
        <div className="aux">
            <Link to="/" className="link-logo-mip">
              <LogoMip className="logo-mip"/>
              Muoversi in Piemonte
            </Link>
            <Menu {...props}/>{/* !! per passare props.param.match */}
            <a href="http://www.regione.piemonte.it/">
              <LogoRegione className='logo_regPie' />
            </a>
        </div>
    </header>

)
export default Header
