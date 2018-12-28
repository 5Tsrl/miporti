import React from 'react'
import axios from 'axios'
import iScroll from 'iscroll'
import ReactIScroll from 'react-iscroll'
import { FormattedMessage } from 'react-intl'

import News from './News'


class NewsWidget extends React.Component {
  static defaultProps = {
    options: {
      mouseWheel: true,
      // snap: true,
      scrollbars: 'custom',
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
    return (
    <div className="widget_news">
        <h2 className="title-2"><FormattedMessage id='news'/></h2>
        <News />
        {/* <div id="scroll_news">
          <ReactIScroll iScroll={iScroll} options={this.props.options}>
            <ul>
                {velineNodes}
            </ul>
        </ReactIScroll>
      </div> */}
    </div>

    )
  }
}

export default NewsWidget
