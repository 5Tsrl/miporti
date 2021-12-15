import React, { useEffect, useState } from 'react'
import { FormattedDate, FormattedMessage } from 'react-intl'
import SimpleBar from 'simplebar-react'
import 'simplebar/dist/simplebar.min.css'


const  News = () => {

  const [news, setNews] = useState([])

  useEffect(  () => {
    const fetchData = async () => {
      const response = await fetch('/news')
      const json = await response.json()
      // console.log(json)
      setNews(json)
    }
    fetchData()
  }, [])

    return (

    <div className="widget_news">
        <h2 className="title-2"><FormattedMessage id='news'/></h2>
        <div id="scroll_news">
          {/* <ReactIScroll iScroll={iScroll} options={this.props.options}> */}
          <SimpleBar style={{ maxHeight: 550 }}>
            <ul>
            {news.map((velina, idx) => {
              return (
                <Velina key={idx} title={velina.title} description={velina.description} validitystart={velina.validitystart} />
              )
            })}
            </ul>
            </SimpleBar>
        {/* </ReactIScroll> */}
      </div>
    </div>

    )

}




const Velina = ({ title, description, validitystart }) => (
  <li className="link_news">
    <div className="notizia">
      {/* <h3>{title}</h3> */}
      <h3 dangerouslySetInnerHTML={{ __html: title }} ></h3>
      <div dangerouslySetInnerHTML={{ __html: description }} ></div>
      <span className="date_news">
        <FormattedDate value={validitystart} day="numeric" month="long" year="numeric" />
      </span>
    </div>
  </li>
)

export default News
