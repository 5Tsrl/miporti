import React from 'react'
import Header from './Header'
import Footer from './Footer'

export default class MainLayout extends React.Component {
  render() {
      //console.log('this.props.location.query.setLng', this.props.location.query.setLng)
    return (
        <div>
            <Header />
            <main className="main">
                {this.props.children}
            </main>            
            <Footer />
        </div>
    )
  }
}