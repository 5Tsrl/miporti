import React from 'react'
import './page.scss'
import axios from 'axios'
import lscache from 'lscache'

class WPage extends React.Component {

  /*  viene ijettato il router nel context, così da poter poi chiamare:
   *  const slug = this.props.routeParams.slug
   */
  static contextTypes = {
    router: React.PropTypes.object
  }
  
	state = { pages: lscache.get('pages') || {} }
	
	/**
	 * Sets the localstorage state, and continues on to set the state of the React component
	 */
  setLocalState = (key, value) => {
        let newPages =  Object.assign({},this.state.pages )
        newPages[key] = value
        this.setState({ pages: newPages })
        lscache.set('pages',this.state.pages , 2)
    }

  getPageContent = (slug) =>{
    axios
      .get('https://www.muoversinpiemonte.it/wp-json/wp/v2/pages?filter[name]=' + slug)
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
  const slug = this.props.routeParams.slug

  if ( ! this.state.pages[slug] ) {
    this.getPageContent(slug)
    
	  return (
      <div className="widget page">
          <h2 className="pageHeader" >.</h2>
          <div className="pageContent">        
              <div className="entry-content">.</div>
          </div>
      </div>            
		)
	}
    return(
      <div className="widget page">
          <h2 className="pageHeader" >{this.state.pages[slug].title.rendered}</h2>
          <div className="pageContent">        
              <div className="entry-content" dangerouslySetInnerHTML={{__html: this.state.pages[slug].content.rendered}}></div>
          </div>
      </div>
    )
  }
}

export default WPage
