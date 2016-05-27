import React from 'react';
import { Link } from 'react-router'

export  default () => 
 
    <footer>
    	<div className="aux">
    		<a href="http://www.regione.piemonte.it/" className="logo-regione">Regione Piemonte</a>
    		<a href="http://www.5t.torino.it/" className="madeby">Powered by <span className="logo-5t">5T</span></a>
    					
    		<div className="wrapper">
    			<span className="info-tel">800 333 444</span>
    			<div className="footer-info">
    				<nav className="footer-menu">
    					<ul>
    						<li><Link to="/privacy">Privacy</Link></li>
    						<li><Link to="/cookie">Cookies</Link></li>
    						<li><Link to="/contatti">Contatti</Link></li>
    					</ul>
    				</nav>
    				<span className="info">&reg;2016 Regione Piemonte - Designed by <a href="http://www.madeincima.it/" target="_blank">Madeincima</a></span>
    			</div>
    			<a href="#" className="social">Twitter</a>
    		</div>
    	</div>
    </footer>
    

        
        
    
  
