import React from 'react'
import ReactCSSTransitionReplace from 'react-css-transition-replace'
import ViaggiaPiemonte from './ViaggiaPiemonte'
import Bip from './Bip'

class Carousel extends React.Component {
  state = { oo: false }

  toggleOo = () => {
    this.setState({ oo: !this.state.oo })
  }

  componentDidMount = () => {
    const intervalId = setInterval(this.toggleOo, 10 * 1000)
    this.setState({ intervalId })
  }

  componentWillUnmount = () => {
    clearInterval(this.state.intervalId);
  }

  render = () => {
    const carouselNode = this.state.oo ? <ViaggiaPiemonte /> : <Bip />
    const node = <div key={`id_${this.state.oo}`}>{carouselNode}</div>

    return <ReactCSSTransitionReplace
          transitionName="carousel"
          transitionEnterTimeout={1000}
          transitionLeaveTimeout={1000}
          >
          {node}
        </ReactCSSTransitionReplace>
  }
}

export default Carousel
