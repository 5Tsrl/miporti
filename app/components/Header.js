import React from 'react'
import { Link } from 'react-router-dom'
import Menu from './Menu'

const Header = props => (

    <header className="clearfix header" id="branding">
        <div className="aux">
            <Link to="/" id="logo_site-title">Muoversi in Piemonte</Link>
            <Menu {...props}/>{/* !! per passare props.param.match */}
            <a href="http://www.regione.piemonte.it/" id="logo_regPie" target="_blank" rel='noopener noreferrer'>Regione Piemonte</a>
        </div>
    </header>

)
export default Header
