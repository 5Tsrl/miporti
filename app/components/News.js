import React from 'react'
import axios from 'axios'
import iScroll from 'iscroll'
import ReactIScroll from 'react-iscroll'
import { FormattedDate, FormattedMessage } from 'react-intl'

// const iScroll = require('iscroll/build/iscroll')

const Velina = ({ title, description, validitystart }) => (
  <li className="link_news">
    <div className="notizia">
      <h3>{title}</h3>
      <div dangerouslySetInnerHTML={{ __html: description }} ></div>
      <span className="date_news">
        <FormattedDate value={validitystart} day="numeric" month="long" year="numeric" />
      </span>
    </div>
  </li>
)

class News extends React.Component {
  static defaultProps = {
    options: {
      mouseWheel: true,
      // snap: true,
      // scrollbars: 'custom',
      scrollbars: 'true',
      interactiveScrollbars: true,
      disableMouse: true,
      preventDefaultException: { tagName: /.*/ },
    },
  }

  state = { news: [] }

  componentDidMount = () => {
    if (this.state.news.length === 0) {
      axios
        .get('/news')
        .then((res) => {
          this.setState({ news: res.data })
        })
        .catch((error) => {
          if (error.response) {
            console.log(error.response.status, error.response.data)
          } else {
            console.log('errore di rete')
          }
        })
    }
  }

  render = () => {
    let velineNodes
    if (this.state.news.length === 0) {
      velineNodes = (
        <li className="link_news">
            <div className="notizia">Notizie non disponibili</div>
        </li>
      )
    } else {
      velineNodes = this.state.news.map((velina, idx) => {
        return (
            <Velina key={idx} title={velina.title} description={velina.description} validitystart={velina.validitystart} />
        )
      })
    }

    return (

    <div className="widget_news">
        <h2 className="title-2"><FormattedMessage id='news'/></h2>
        <div id="scroll_news">
          <ReactIScroll iScroll={iScroll} options={this.props.options}>
            <ul>
                {velineNodes}
            </ul>
        </ReactIScroll>
      </div>
    </div>

    )
  }
}

export default News
