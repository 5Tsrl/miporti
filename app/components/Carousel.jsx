import React from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import ViaggiaPiemonte from './ViaggiaPiemonte'
import Bip from './Bip'

class Carousel extends React.Component {
  state = {oo: false}
  
  toggleOo = () => {
    this.setState({oo: !this.state.oo})
  }
  
  componentDidMount = () => {
    const intervalId = setInterval(this.toggleOo, 10*1000)
    this.setState({intervalId: intervalId})
  }

  componentWillUnmount = () => {
    clearInterval(this.state.intervalId);
  }

  render = () => {
    const carouselNode = this.state.oo ? <ViaggiaPiemonte /> : <Bip />
    const node = <div className="carouselFade" key={'id_'+this.state.oo}>{carouselNode}</div>

    return <ReactCSSTransitionGroup      
          transitionName="carousel"
          transitionEnterTimeout={600}
          transitionLeaveTimeout={600}
          >
          {node}
        </ReactCSSTransitionGroup>
  
  }
}

export default Carousel

