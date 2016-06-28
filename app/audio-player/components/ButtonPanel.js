import React from 'react'
//var React = require('react/addons');
//var Button = require('react-bootstrap/Button');
//var Glyphicon = require('react-bootstrap/Glyphicon');
//var ButtonGroup = require('react-bootstrap/ButtonGroup');

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
		var iconClasses = "";

		if (isLoading) {
			iconName = "refresh";
			iconClasses = "audio-refresh-animate";
		} else {
			iconName = isShowPlayBtn ? "play" : "pause";
		}

		var songIndex = this.props.currentSongIndex;
		var buttonPanelClasses = "player audio-button-panel pull-left";

			return (
				<div className={buttonPanelClasses}>
                    
					<div bsSize="small" onClick={buttonClickHandler}>
                    <span id="playtoggle" />    
						{/*<Glyphicon className={iconClasses} glyph={iconName} />*/}
					</div>
				</div>
			);

	}
});