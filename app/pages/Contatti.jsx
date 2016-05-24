import React from 'react'
import ReactIScroll from 'react-iscroll'
var iScroll = require('iscroll/build/iscroll')
import './servizio/servizio.scss';

const News = React.createClass({
    
    getDefaultProps: function() {
        return ({
          options: {
            mouseWheel: true,
            //snap: true,
            scrollbars: 'custom',
            interactiveScrollbars: true,
            //shrinkScrollbars: 'clip',
            //fadeScrollbars: 'true',
            disableMouse: true,
            preventDefaultException: { tagName:/.*/ } 
          }
        })
    },    
        
    render: function() {
        const styles = {
          titleStyle: {color: '#fff', backgroundColor: '#4089cd',padding: '15px 35px'},
        }
        return(
    <div className="widget widget_news widget_servizio">
        <h2 style={styles.titleStyle}>Contatti</h2>
        <div id="scroll_news">
          <ReactIScroll iScroll={iScroll} options={this.props.options}>
              
              <div className="text">
                  <p>piripicchio </p>       
              </div>
        
          </ReactIScroll>	
      </div>
        
    </div>
)}
  
})

export default News