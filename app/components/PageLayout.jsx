import React from 'react'


export default class PageLayout extends React.Component {
    
      render() {
         
        return (
            
        <div className="aux widget_container">
            <div  className="widget_4-4">
                {this.props.children}
            </div>            
        </div>
      
        )
    }
}