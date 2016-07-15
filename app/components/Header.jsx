import React from 'react';
import Menu from './Menu';

const Header = () =>(

    <header className="clearfix header" id="branding">
        <div className="aux">
            <a href="#" id="logo_site-title">Muoversi in Piemonte</a>
            <Menu />
            <a href="http://www.regione.piemonte.it/" id="logo_regPie" target="_blank">Regione Piemonte</a>
        </div>
    </header>

)
export default Header