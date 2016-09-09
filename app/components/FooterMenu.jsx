import React from 'react';
import { connect} from 'react-redux'
import {update} from 'react-intl-redux'
import { Link } from 'react-router'
import axios from 'axios'
import lscache from 'lscache'

const FooterMenuItem = React.createClass({
  render: function() {
    return (
        <li><Link to={this.props.url}>{this.props.title}</Link></li>
    )
  }
})

let FooterMenu = React.createClass({

    getInitialState: function () {
      // Check our localstorage cache, we may as well load from there if we have it
      return  { footerMenu: lscache.get(`footerMenu_${this.props.currentLocale}`)
              }
  },


  loadMenu: function() {
          let menuId = 3 //it
          if(this.props.currentLocale == 'en') menuId=6

          axios
              .get('http://mip.5t.torino.it/wp-json/wp-api-menus/v2/menus/'+menuId)
              .then( (res) =>{
                  //console.log('scaricato', `footerMenu_${this.props.currentLocale}`)
                  this.setState({footerMenu: res.data})
                  lscache.set(`footerMenu_${this.props.currentLocale}`,res.data,5)
              })
  },

componentDidMount: function() {
    if(this.state.footerMenu == null) {
        this.loadMenu()
    }
},

render: function() {
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
})

//mappo l' intl.locale dello state di redux sulla props currentLocale
function mapStateToProps(state) {
  return { currentLocale: state.intl.locale }
}

FooterMenu = connect(mapStateToProps)(FooterMenu)
export default FooterMenu
