import React from 'react'
import { Helmet } from 'react-helmet'
import Header from './Header'
import PageLayout from './PageLayout.js'
import News from './News'
import './page.scss'

class NewsPage extends React.Component {
  state = {
    page: {},
    isLoaded: false,
  }

  render = () => {
    const { page, isLoaded } = this.state
    return (
      <React.Fragment>
        <Helmet>
          <title>{isLoaded ? page.title.rendered : ''} | Muoversi in Piemonte</title>
        </Helmet>
        <Header {...this.props}/>{/* !! per passare props.param.match */}
        <main className="main">
          <PageLayout>
            <div className="widget page">
                <h2 className="pageHeader" >{isLoaded ? page.title.rendered : 'Avvisi TPL'}</h2>
                <div className="pageContent">
                  <div id="scroll_news">
                    <News/>
                  </div>
                </div>
            </div>
          </PageLayout>
        </main>
      </React.Fragment>
    )
  }
}

export default NewsPage
