import React from 'react'
import { Button } from 'react-bootstrap'
import { Glyphicon } from 'react-bootstrap'
import { ButtonGroup } from 'react-bootstrap'
import classNames from 'classnames'

module.exports = React.createClass({

	getDefaultProps: function() {
		return {
			currentSongIndex: 0,
			songCount: 0
		};
	},

	render: function() {

		var isPlaying = this.props.isPlaying;
		var isPause = this.props.isPause;
		var isLoading = this.props.isLoading;
		var isShowPlayBtn = !isPlaying || isPause;
		var buttonClickHandler = isShowPlayBtn ? this.props.onPlayBtnClick : this.props.onPauseBtnClick;
		var iconName;
		var iconClasses = classNames('audio-button',  {playing: this.props.isPlaying},  {paused: this.props.isPause}  )

	
		var songIndex = this.props.currentSongIndex;
		var buttonPanelClasses = "audio-button-panel pull-left";

    //console.log(isPlaying,isPause,isLoading,isShowPlayBtn);
    //console.log('iconClasses',iconClasses);

    if (this.props.songCount < 2) {
    return (
      <div role="button"  className={iconClasses} onClick={buttonClickHandler}></div>
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
})