import React from 'react';
import {FormattedMessage} from 'react-intl'

export default () =>(

    <div className="widget_twitter">
        <h2 className="title-2"><FormattedMessage id='Tweet di mobilità'/></h2> 
        <div id="scroll_twit">

            <a className="twitter-timeline" href="https://twitter.com/5TLive/lists/muoversinpiemonte"
               data-chrome="nofooter noheader noborders noscrollbar "
               height="424"
               data-list-owner-screen-name="5TLive"
               data-list-slug="muoversinpiemonte"
               data-widget-id="723176655192133634"
               >Tweet di @5Tlive</a>
        </div>
    </div>

)
