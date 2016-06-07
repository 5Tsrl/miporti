import React from 'react'
import ReactIScroll from 'react-iscroll'
var iScroll = require('iscroll/build/iscroll')

const News = React.createClass({
    
    getDefaultProps: function() {
        return ({
          options: {
            mouseWheel: true,
            //snap: true,
            scrollbars: 'custom',
            interactiveScrollbars: true,
            mouseWheel: true,
            disableMouse: true,
            preventDefaultException: { tagName:/.*/ } 
          }
        })
    },    
        
    render: function() {
        
        return(
    <div className="widget_news">
        <h2 className="title-2">Ultime news</h2>
        <div id="scroll_news">
          <ReactIScroll iScroll={iScroll} options={this.props.options}>
        
            <ul>
                <li className="link_news">
                    <a href="#">
                        <h3>Sicurezza Stradale: la campagna "Sulla buona strada" del Ministero delle Infrastrutture e dei Trasporti</h3>
                        Sulla Buona strada (#sullabuonastrada) è la nuova campagna di comunicazione e sensibilizzazione sulla sicurezza stradale del Ministero 
                        delle Infrastrutture e dei Trasporti rivolta a tutti gli utenti della strada.
                        
                        La campagna  si sviluppa attorno a 5 messaggi di sicurezza stradale da diffondere su tutti i media 
                        (tv, radio, stampa, affissioni, web) e attraverso i social network Twitter
                        (dove ogni tweet tematico riporta l'hashtag #sullabuonastrada) e Facebook
                        <span className="date_news"><span className="date">05 mag 2016</span> <span className="time">11:55</span></span>
                    </a>
                </li>
                <li className="link_news">
                    <a href="#">
                        <h3>Lorem ipsum dolor sit amet.</h3>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis tempor est tempor metus vehicula, ut pretium odio laoreet. Nunc eu sapien nec ligula viverra sodales sed nec quam.
                        <span className="date_news"><span className="date">08 dic 2015</span> <span className="time">11:55</span></span>
                    </a>
                </li>
                <li className="link_news">
                    <a href="#">
                        <h3>Lorem ipsum dolor sit amet.</h3>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis tempor est tempor metus vehicula, ut pretium odio laoreet. Nunc eu sapien nec ligula viverra sodales sed nec quam.
                        <span className="date_news"><span className="date">08 dic 2015</span> <span className="time">11:55</span></span>
                    </a>
                </li>
                <li className="link_news">
                    <a href="#">
                        <h3>Lorem ipsum dolor sit amet.</h3>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis tempor est tempor metus vehicula, ut pretium odio laoreet. Nunc eu sapien nec ligula viverra sodales sed nec quam.
                        <span className="date_news"><span className="date">08 dic 2015</span> <span className="time">11:55</span></span>
                    </a>
                </li>
                <li className="link_news">
                    <a href="#">
                        <h3>Lorem ipsum dolor sit amet.</h3>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis tempor est tempor metus vehicula, ut pretium odio laoreet. Nunc eu sapien nec ligula viverra sodales sed nec quam.
                        <span className="date_news"><span className="date">08 dic 2015</span> <span className="time">11:55</span></span>
                    </a>
                </li>
                <li className="link_news">
                    <a href="#">
                        <h3>Lorem ipsum dolor sit amet.</h3>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis tempor est tempor metus vehicula, ut pretium odio laoreet. Nunc eu sapien nec ligula viverra sodales sed nec quam.
                        <span className="date_news"><span className="date">08 dic 2015</span> <span className="time">11:55</span></span>
                    </a>
                </li>
            </ul>
        </ReactIScroll>	
      </div>
        
    </div>
)}
  
})

export default News