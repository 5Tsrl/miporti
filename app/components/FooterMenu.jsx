import React from 'react';
import { connect} from 'react-redux'
import {update} from 'react-intl-redux'
import { Link } from 'react-router'
import axios from 'axios'
import lscache from 'lscache'

const FooterMenuItem = (props) => {
  return <li><Link to={props.url}>{props.title}</Link></li>
  }

class FooterMenu extends React.Component {
  state = { footerMenu: lscache.get(`footerMenu_${this.props.currentLocale}`) }

  loadMenu = () => {
          let menuId = 3 //it
          if(this.props.currentLocale == 'en') menuId=6

          axios
              .get('/wp-json/wp-api-menus/v2/menus/'+menuId)
              .then( (res) =>{
                  //console.log('scaricato', `footerMenu_${this.props.currentLocale}`)
                  this.setState({footerMenu: res.data})
                  lscache.set(`footerMenu_${this.props.currentLocale}`,res.data,5)
              })
  }

  componentDidMount = () => {
    //se è già presente nella lscache di pamela, viene pescato in inizializzazione e messo nello state
    if(this.state.footerMenu == null) {
        this.loadMenu()
    }
  }

  render = ()  => {
    if ( ! this.state.footerMenu ) {
       var footerMenuNodes = <FooterMenuItem title="home" url="/"  />
       return (
           <div className="loading-wrap">
               <div className="loading"><span className="fa fa-heart"></span> LOADING</div>
           </div>
       )
   }else{

        var footerMenuNodes = this.state.footerMenu.items.map( function(item, idx){
            const baseurl="http://wpmip.5t.torino.it"
            const url = '/page'+item.url.slice(baseurl.length,-1)
            return(
                <FooterMenuItem key={idx} title={item.title} url={url}  />
            )
        }.bind(this))
    }
    return (
        <nav className="footer-menu">
            <ul>
                {footerMenuNodes}
            </ul>
        </nav>
    )
  }
}

//mappo l' intl.locale dello state di redux sulla props currentLocale
function mapStateToProps(state) {
  return { currentLocale: state.intl.locale }
}

FooterMenu = connect(mapStateToProps)(FooterMenu)
export default FooterMenu
