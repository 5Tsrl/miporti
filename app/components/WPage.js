import React from 'react'
import axios from 'axios'
// import lscache from 'lscache'
import './page.scss'
import PageLayout from './PageLayout.js'

class WPage extends React.Component {
  // state = { pages: lscache.get('pages') || {} }
  state = {
    page: {},
    isLoaded: false,
  }

  setLocalState = (key, value) => {
    const newPages = Object.assign({}, this.state.pages)
    newPages[key] = value
    this.setState({ pages: newPages })
    lscache.set('pages', this.state.pages, 2)
  }

  getPageContent = () => {
    const { slug } = this.props.match.params
    console.log('slug', slug)
    axios
      .get(`/wp-json/wp/v2/pages?filter[name]=${slug}`)
      .then((res) => {
        if (res.data[0]) {
          // this.setLocalState(slug, res.data[0])
          this.setState({ page: res.data[0], isLoaded: true })
        } else {
          this.props.history.push('/notfound')
        }
      })
      .catch((error) => {
        console.log('error', error)
      })
  }

  componentDidMount() {
    console.log('componentDidMount() called')
    this.getPageContent()
  }

  componentWillReceiveProps() {
    console.log('componentWillReceiveProps() called')
    this.setState({ page: {}, isLoaded: false })
    this.getPageContent()
  }

  render = () => {
    const { page, isLoaded } = this.state
    return (
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
    )
  }
}

export default WPage
