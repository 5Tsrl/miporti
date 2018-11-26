import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'

export default class ProgressBar extends React.Component {
  render() {
    const percent = this.props.percent * 100;
    const style = { left: `${percent}%` }
    const classes = classNames({
      'audio-progress-container': true,
      visibile: this.props.isPlaying,
      'audio-progress-container-short-width': this.props.shorter,
    });

    return (
      <div ref="progressBar" className={classes} style={this.props.progressStyle} onClick={this.seekTo}>
        <div className="audio-progress" style={style}></div>
      </div>
    )
  }
}

ProgressBar.propTypes = {
  progressStyle: PropTypes.object,
  percent: PropTypes.any,
  shorter: PropTypes.any,
  isPlaying: PropTypes.any,
}

ProgressBar.defaultProps = {
  progressStyle: { marginLeft: '5px' },
}
