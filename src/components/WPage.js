import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import PageLayout from './PageLayout.js'
import './page.scss'

const WPage = (props) => {

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  const { slug } = useParams()
  // console.log('slug', slug)

  let navigate = useNavigate()

  useEffect(  () => { // https://www.robinwieruch.de/react-hooks-fetch-data/
    const fetchData = async () => {
      // const response = await fetch(`/wp-json/wp/v2/pages?filter[name]=${slug}`)
      const response = await fetch(`/wp-json/wp/v2/pages?slug=${slug}`)  //su nuovo spmip su aws...
      const json = await response.json()
      // console.log(json)
      if(json && Array.isArray(json) && json.length > 0){
        setTitle( json[0].title.rendered )
        // content.rendered.replace(/http:\/\/wpmip.5t.torino.it\/wp-content\/uploads/gi, '/wp-images') }
        setContent( json[0].content.rendered )
      } else {
        // history.push('/notfound')
        navigate(`/notfound`)
        console.log('NOT FOUND')
      }
    }
    fetchData()
  }, [slug, navigate])

    return (
      <>
        <Helmet>
          <title>{title} | Muoversi in Piemonte</title>
        </Helmet>
        <main className="main">
          <PageLayout>
            <div className="widget page">
                <h2 className="pageHeader" >{title}</h2>
                <div className="pageContent">
                  <div className="entry-content" dangerouslySetInnerHTML={{ __html: content }}></div>
                </div>
            </div>
          </PageLayout>
        </main>
      </>
    )

}

export default WPage
