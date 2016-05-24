import React from 'react';
import { Link } from 'react-router'
export  default () => (
    <div>
        <nav className="main-menu-container" id="main-menu-container">
            <ul className="main-menu-5t" id="main-menu-5t">
                <li id="menu-home" className="active"><Link to="/">Home</Link></li>
                <li id="menu-planner"><a href="/#planner">Calcolo percorsi</a></li>
                <li id="menu-traffic"><a href="/#traffic">Traffico</a></li>
                <li id="menu-otp-infoWidget-3"><Link className="modalboxMenu" to="/servizio">Il servizio</Link></li>
                <li id="menu-otp-infoWidget-4"><Link className="modalboxMenu" to="/contatti">Contatti</Link></li>
            </ul>
            <div className="language-switcher" id="language-switcher">
                <ul>
                    <li><a href="?setLng=it" className="current_lang">it</a></li>
                    <li><a href="?setLng=en">en</a></li>
                </ul>
            </div>
        </nav>
        <span id="nav-toggle" className="">
            <span className="icon"> <span></span></span>
        </span>    
    </div>

)
