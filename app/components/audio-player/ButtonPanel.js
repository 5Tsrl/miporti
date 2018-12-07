import React from 'react'
import { Button, Glyphicon, ButtonGroup } from 'react-bootstrap'
import classNames from 'classnames'


export default class ButtonPanel extends React.Component {
  render() {
    const { isPlaying } = this.props
    const { isPause} = this.props
    const { isLoading} = this.props
    const isShowPlayBtn = !isPlaying || isPause
    const buttonClickHandler = isShowPlayBtn ? this.props.onPlayBtnClick : this.props.onPauseBtnClick
    let iconName
    let iconClasses = classNames('audio-button',  {playing: this.props.isPlaying},  {paused: this.props.isPause}  )


    let songIndex = this.props.currentSongIndex;
    let buttonPanelClasses = 'audio-button-panel pull-left';

    //console.log(isPlaying,isPause,isLoading,isShowPlayBtn);
    //console.log('iconClasses',iconClasses);

    if (this.props.songCount < 2) {
      return (
        <div role="button" className={iconClasses} onClick={buttonClickHandler}></div>
      )

  } else {

    var nextButtonClass = songIndex == this.props.songCount - 1 ? "disabled" : "";

    return (
      <ButtonGroup className={buttonPanelClasses}>
        <Button bsSize="small" onClick={this.props.onPrevBtnClick}>
          <Glyphicon glyph="step-backward" />
        </Button>
        <Button bsSize="small" onClick={buttonClickHandler}>
          <Glyphicon className={iconClasses} glyph={iconName} />
        </Button>
        <Button bsSize="small" onClick={this.props.onNextBtnClick} className={nextButtonClass}>
          <Glyphicon glyph="step-forward" />
        </Button>
      </ButtonGroup>
      )
    }
  }
}

ButtonPanel.defaultProps = {
  currentSongIndex: 0,
  songCount: 0,
}
