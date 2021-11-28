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
    this.setState({ intervalId })// keep ref for unmounting
  }

  componentWillUnmount = () => {
    clearInterval(this.state.intervalId);
  }

  render = () => {
    return <ReactCSSTransitionReplace
          transitionName="carousel"
          transitionEnterTimeout={1000}
          transitionLeaveTimeout={1000}
          >
            <div key={`id_${this.state.oo}`}>
              {this.state.oo ? <ViaggiaPiemonte /> : <Bip />}
            </div>
        </ReactCSSTransitionReplace>
  }
}

export default Carousel
