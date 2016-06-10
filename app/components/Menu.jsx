import React from 'react';
import { Link } from 'react-router'

class Menu extends React.Component {
    
constructor(props) {
    super(props);
    this.state = {
        menuIsOpen: false
    }
}
  
componentDidMount() {
    // Detects Touch or noTouch devices
	if(!!('ontouchstart' in window)){ //check for touch device
		//$('body').addClass('touch');
        document.body.classList.add('touch')
	} else{ //behaviour and events for pointing device like mouse
		//$('body').addClass('no-touch');
        document.body.classList.add('no-touch')
	}
    
    document.body.classList.toggle('menu-open', this.state.menuIsOpen)
}

handleClick() {
    this.setState({menuIsOpen: !this.state.menuIsOpen}, () =>{
        document.body.classList.toggle('menu-open', this.state.menuIsOpen)
    })    
}
    
    render() {
        return (
<div>
    <nav className="main-menu-container" id="main-menu-container">
        <ul className="main-menu-5t" id="main-menu-5t">
            <li id="menu-home" className="active"><Link to="/" activeClassName="active" onClick={this.handleClick}>Home</Link></li>
            <li id="menu-planner"><a href="/#planner">Calcolo percorsi</a></li>
            <li id="menu-traffic"><a href="/#traffic">Traffico</a></li>
            <li id="menu-otp-infoWidget-3"><Link className="modalboxMenu" to="/servizio" activeClassName="active" onClick={this.handleClick}>Il servizio</Link></li>
            <li id="menu-otp-infoWidget-4"><Link className="modalboxMenu" to="/contatti" activeClassName="active" onClick={this.handleClick}>Contatti</Link></li>
        </ul>
        <div className="language-switcher" id="language-switcher">
            <ul>
                <li><a href="?setLng=it" className="current_lang">it</a></li>
                <li><a href="?setLng=en">en</a></li>
            </ul>
        </div>
    </nav>
    <span id="nav-toggle" onClick={this.handleClick.bind(this)}>
        <span className="icon"> <span></span></span>
    </span>    
</div>

        )
    }
}
export default Menu
