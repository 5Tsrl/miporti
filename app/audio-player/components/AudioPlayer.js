import React from 'react'
import ButtonPanel from './ButtonPanel'
import ProgressBar from './ProgressBar'
import '../audioplayer.scss'

var Howl = require('../vendor/howler.min.js').Howl;

class AudioPlayer extends React.Component {

	state = {
			isPlaying: false,
			isPause: false,
			isLoading: false,
			currentSongIndex: -1,
			volume: 0.5
		}

	componentDidMount() {

		if (this.props.dataUrl) {
			$.ajax({
			  dataType: "json",
			  url: this.props.dataUrl,
			  success: function(response) {
			  	this.setState({
			  									songs: response.songs,
			  									currentSongIndex: 0
			  							 });
			  }.bind(this)
			});
		} else if (this.props.songs) {
			this.setState({
											songs: this.props.songs,
											currentSongIndex: 0
										});
		} else {
			throw "no data";
		}
	}

	componentDidUpdate(prevProps, prevState, prevContext) {
		if (this.state.isPlaying && this.state.currentSongIndex != prevState.currentSongIndex) {
			this.initSoundObject();
		}
	}

  getSongName(song) {
		if (song.hasOwnProperty("name")) {
			return song.name;
		} else {
			var urlSplit = song.url.split("/");
			return urlSplit[urlSplit.length - 1];
		}
	}

	render() {
		var songCount = this.songCount();
		var percent = 0;
		if (this.state.seek && this.state.duration) {
			percent = this.state.seek / this.state.duration;
		}

		var songName = this.getCurrentSongName()

		return (
			<div className="audio-player">
          <ButtonPanel key="1" isPlaying={this.state.isPlaying} isPause={this.state.isPause}
    					isLoading={this.state.isLoading}
    					currentSongIndex={this.state.currentSongIndex} songCount={songCount}
    					onPlayBtnClick={this.onPlayBtnClick.bind(this)} onPauseBtnClick={this.onPauseBtnClick.bind(this)}
    					onPrevBtnClick={this.onPrevBtnClick.bind(this)} onNextBtnClick={this.onNextBtnClick.bind(this)} />
            <ProgressBar key="2" shorter={songCount > 1} percent={percent} seekTo={this.seekTo.bind(this)}  isPlaying={this.state.isPlaying}/>
			</div>
		);
	}

	onPlayBtnClick() {
		if (this.state.isPlaying && !this.state.isPause) {
			return;
		};
		this.play();
	}

	onPauseBtnClick() {
		var isPause = !this.state.isPause;
		this.setState({ isPause: isPause });
		isPause ? this.pause() : this._play();
	}

	onPrevBtnClick() {
		this.prev();
	}

	onNextBtnClick() {
		this.next();
	}


	play() {

		this.setState({ isPlaying: true, isPause: false });

		if (!this.howler) {
			this.initSoundObject();
		} else {
			var songUrl = this.state.songs[this.state.currentSongIndex].url;
			if (songUrl != this.howler._src) {
				this.initSoundObject();
			} else {
				this._play();
			}
		}
	}

	initSoundObject() {
		this.clearSoundObject();
		this.setState({ isLoading: true });

		var song = this.state.songs[this.state.currentSongIndex];
		this.howler = new Howl({
			src: song.url,
			volume: this.state.volume,
			onload: this.initSoundObjectCompleted.bind(this),
			onend: this.playEnd
		});
	}

	clearSoundObject() {
 		if (this.howler) {
			this.howler.stop();
			this.howler = null;
		}
 	}

	initSoundObjectCompleted() {
		this._play();
		this.setState({
			duration: this.howler.duration(),
			isLoading: false
		});
	}

	_play() {
		this.howler.play();
		this.stopUpdateCurrentDuration();
		this.updateCurrentDuration();
		this.interval = setInterval(this.updateCurrentDuration.bind(this), 1000);
	}

	playEnd() {
		if(this.state.currentSongIndex == this.state.songs.length - 1) {
			this.stop();
		} else {
			this.next();
		}
	}

	stop() {
		this.stopUpdateCurrentDuration();
		this.setState({ seek: 0, isPlaying: false });
	}

	pause() {
		this.howler.pause();
		this.stopUpdateCurrentDuration();
	}

	prev() {
		if (this.state.seek > 1 || this.state.currentSongIndex == 0) {
			this.seekTo(0);
		} else {
			this.updateSongIndex(this.state.currentSongIndex - 1);
		}
	}

	next() {
		this.updateSongIndex(this.state.currentSongIndex + 1);
	}

	updateSongIndex(index) {
		this.setState({
										currentSongIndex: index,
										duration: 0
									});
		if (this.state.isPause) {
			this.stop();
			this.clearSoundObject();
		} else {
			this.stopUpdateCurrentDuration();
		}
	}

	updateCurrentDuration() {
		this.setState({ seek: this.howler.seek() });
	}

	stopUpdateCurrentDuration() {
		clearInterval(this.interval);
	}

	seekTo(percent) {
		var seek = this.state.duration * percent;
		this.howler.seek(seek);
		this.setState({ seek: seek });
	}

	adjustVolumeTo(percent) {
		this.setState({ volume: percent });
		if (this.howler) {
			this.howler.volume(percent);
		}
	}

	songCount() {
		return this.state.songs ? this.state.songs.length : 0;
	}

	getCurrentSongName() {
		if (this.state.currentSongIndex < 0) {
			return "";
		}
		var song = this.state.songs[this.state.currentSongIndex];
		return this.getSongName(song);
 	}

}
AudioPlayer.defaultProps = {
  songs:[],
}

export default AudioPlayer
