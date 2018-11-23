import React from 'react'
import {FormattedMessage} from 'react-intl'
import {Timeline} from 'react-twitter-widgets'

class Tweet extends React.Component {

  render() {
    return <div className="widget_twitter">
      <h2 className="title-2"><FormattedMessage id='Tweet di mobilità'/></h2>
      <div id="_scroll_twit">
        <Timeline
          dataSource={{
            sourceType: 'list',
            ownerScreenName: '5Tlive',
            slug: 'muoversinpiemonte'
          }}
          widgetId={'723176655192133634'}
          options={{
            height: '424',
            chrome: 'nofooter  noheader noborders noscrollbar',
          }}
        />
      </div>
  </div>
  }
}

export default Tweet
