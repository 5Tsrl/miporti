import React from 'react'
import axios from 'axios'

import Header from './Header'
import PageLayout from './PageLayout.js'
import './page.scss'

class WPage extends React.Component {
  state = {
    page: {},
    isLoaded: false,
  }

  getPageContent = () => {
    const { slug } = this.props.match.params
    // console.log('slug', slug)
    axios
      .get(`/wp-json/wp/v2/pages?filter[name]=${slug}`)
      .then((res) => {
        if (res.data[0]) {
          this.setState({ page: res.data[0], isLoaded: true })
        } else {
          this.props.history.push('/notfound')
          // console.log('NOT FOUND')
        }
      })
      .catch((error) => {
        console.log('error', error)
      })
  }

  componentDidMount() {
    this.getPageContent()
  }

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.match.params !== prevProps.match.params) {
      this.getPageContent()
    }
  }

  render = () => {
    const { page, isLoaded } = this.state
    return (
      <React.Fragment>
        <Header {...this.props}/>{/* !! per passare props.param.match */}
        <main className="main">
          <PageLayout>
            <div className="widget page">
                <h2 className="pageHeader" >{isLoaded ? page.title.rendered : ''}</h2>
                <div className="pageContent">
                  {isLoaded ? (
                    <div className="entry-content" dangerouslySetInnerHTML={{ __html: page.content.rendered }}></div>
                    ) : (
                    <div className="entry-content">...</div>
                  )}
                </div>
            </div>
          </PageLayout>
        </main>
      </React.Fragment>
    )
  }
}

export default WPage
