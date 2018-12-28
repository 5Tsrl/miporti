import React from 'react'
import FooterMenu from './FooterMenu'
import './footer.scss'
import LogoRegione from '../images/logo-regione-piemonte.svg'
import LogoTwitter from '../images/twitter_circle.svg'

const Footer = () => (
  <footer>
    <div className="aux">
      <a href="http://www.regione.piemonte.it/" className="link-regione">
        <LogoRegione className='logo_regPie'/>
      </a>
      <a href="http://www.5t.torino.it/" className="madeby">Powered by <span className="logo-5t">5T</span></a>
      <div className="wrapper">
        <span className="info-tel">800 333 444</span>
        <div className="footer-info">
          <FooterMenu />
          <span className="info">&reg;2019 Regione Piemonte - Designed by
            <a href="http://www.madeincima.it/">Madeincima</a>
          </span>
        </div>
        <a href="https://twitter.com/mipiemonte" className="social">
          <LogoTwitter className='logoTwitter'/>
        </a>
      </div>
    </div>
  </footer>
)
export default Footer
