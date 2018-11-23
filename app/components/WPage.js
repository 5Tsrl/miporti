import React from 'react'
import axios from 'axios'
import lscache from 'lscache'
import './page.scss'
import PageLayout from './PageLayout.js'

class WPage extends React.Component {

  state = { pages: lscache.get('pages') || {} }

  setLocalState = (key, value) => {
    let newPages =  Object.assign({},this.state.pages )
    newPages[key] = value
    this.setState({ pages: newPages })
    lscache.set('pages',this.state.pages , 2)
  }

  componentDidMount() {
    const slug = this.props.match.params.slug
    axios
      .get('/wp-json/wp/v2/pages?filter[name]=' + slug)
      .then( (res) =>{
        if(res.data[0])
          this.setLocalState(slug, res.data[0])
        else {
          this.context.router.push("/notfound")
        }
      })
    .catch(function (error) {
      console.log('error', error)
    })
  }

  render = () => {
    const {slug} = this.props.match.params
    const {pages} = this.state
      return (
      <PageLayout>
        <div className="widget page">
            <h2 className="pageHeader" >{pages[slug] ? pages[slug].title.rendered : ''}</h2>
            <div className="pageContent">
              {pages[slug] ? (
                <div className="entry-content" dangerouslySetInnerHTML={{__html: this.state.pages[slug].content.rendered}}></div>
                ) : (
                <div className="entry-content">.</div>
              )}
            </div>
        </div>
      </PageLayout>
    )
  }
}

export default WPage
