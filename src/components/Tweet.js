import React from 'react'
import { FormattedMessage } from 'react-intl'
import { Timeline } from 'react-twitter-widgets'

const Tweet = () => (
  <div className="widget_twitter">
    <h2 className="title-2"><FormattedMessage id='tweet'/></h2>
    <Timeline
      dataSource={{
        sourceType: 'list',
        ownerScreenName: '5Tlive',
        slug: 'muoversinpiemonte',
      }}
      widgetId={'723176655192133634'}
      options={{
        height: '424',
        chrome: 'nofooter  noheader noborders noscrollbar',
        id: "list:5Tlive"
      }}
    />
  </div>
)

export default Tweet
