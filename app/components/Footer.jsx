import React from 'react';
import { Link } from 'react-router'
import FooterMenu from './FooterMenu'

export  default () => 
 
    <footer>
    	<div className="aux">
    		<a href="http://www.regione.piemonte.it/" target="_blank" className="logo-regione">Regione Piemonte</a>
    		<a href="http://www.5t.torino.it/" target="_blank" className="madeby">Powered by <span className="logo-5t">5T</span></a>
    					
    		<div className="wrapper">
    			<span className="info-tel">800 333 444</span>
    			<div className="footer-info">
                    <FooterMenu />
                    {/*
    				<nav className="footer-menu">
    					<ul>
                            <li><Link to="/disclaimer">Disclaimer</Link></li>
    						<li><Link to="/disclaimer-old">Disclaimer</Link></li>
    						<li><Link to="/cookie">Cookies</Link></li>
    						<li><Link to="/contatti">Contatti</Link></li>
    					</ul>
    				</nav>
                    */}
    				<span className="info">&reg;2016 Regione Piemonte - Designed by <a href="http://www.madeincima.it/" target="_blank">Madeincima</a></span>
    			</div>
    			<a href="https://twitter.com/mipiemonte" className="social" target="_blank">Twitter</a>
    		</div>
    	</div>
    </footer>
    

        
        
    
  
