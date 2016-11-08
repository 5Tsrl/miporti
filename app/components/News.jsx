import React from 'react'
import axios from 'axios'
import lscache from 'lscache'
import ReactIScroll from 'react-iscroll'
import {FormattedDate, FormattedMessage} from 'react-intl'

const iScroll = require('iscroll/build/iscroll')

const Velina = (props)=>(
  <li className="link_news">
    <div className="notizia">
      <h3>{props.title}</h3>
      <div dangerouslySetInnerHTML={{__html: props.description}} ></div>
      <span className="date_news">
        <FormattedDate value={props.validitystart} day="numeric" month="long" year="numeric" />
      </span>
    </div>
  </li>
)

class News extends React.Component {
  
  static defaultProps = {
    options: {
      mouseWheel: true,
      //snap: true,
      scrollbars: 'custom',
      interactiveScrollbars: true,
      mouseWheel: true,
      disableMouse: true,
      preventDefaultException: { tagName:/.*/ }
    }
  }
  
  state = lscache.get(this.constructor.displayName) || {news: []}

	/**
	 * Sets the localstorage state, and continues on to set the state of the React component
	 */
	setLocalState = (data)=> {
		// Store in LocalStorage
		lscache.set(this.constructor.displayName, data, 2);
		// Store in Component State
		this.setState(data);
	}

  componentDidMount = () => {
    if(this.state.news.length == 0) {
			axios
        .get('https://www.muoversinpiemonte.it/news')
				.then( (res) =>{
          this.setLocalState({news: res.data})
			})
    }
	}

  render = () => {
      
    let velineNodes
    if ( this.state.news.length == 0 ) {
        velineNodes = (
          <li className="link_news">
              <div className="notizia">Notizie non disponibili</div>              
          </li>
        )
		}
    else {
        velineNodes = this.state.news.map( function(velina, idx){
            return(
                <Velina key={idx} title={velina.title} description={velina.description} validitystart={velina.validitystart} />
            )
        }.bind(this))
    }

    return(

    <div className="widget_news">
        <h2 className="title-2"><FormattedMessage id='Ultime news'/></h2>
        <div id="scroll_news">
          <ReactIScroll iScroll={iScroll} options={this.props.options}>
            <ul>
                {velineNodes}
            </ul>
        </ReactIScroll>
      </div>
    </div>

)}

}

export default News
