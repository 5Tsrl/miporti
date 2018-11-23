import React from 'react'
import Menu from './Menu'
import { Link } from 'react-router-dom'

const Header = () =>(

    <header className="clearfix header" id="branding">
        <div className="aux">
            <Link to="/" id="logo_site-title">Muoversi in Piemonte</Link>
            <Menu />
            <a href="http://www.regione.piemonte.it/" id="logo_regPie" target="_blank">Regione Piemonte</a>
        </div>
    </header>

)
export default Header
