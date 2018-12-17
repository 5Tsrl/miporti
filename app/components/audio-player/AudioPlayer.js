import React from 'react'
import { Howl } from 'howler'
import ButtonPanel from './ButtonPanel'
import ProgressBar from './ProgressBar'
import './audioplayer.scss'

class AudioPlayer extends React.Component {
  state = {
    isPlaying: false,
    isPause: false,
    isLoading: false,
    currentSongIndex: -1,
    volume: 0.5,
  }

  componentDidMount() {
    if (this.props.dataUrl) {
      $.ajax({
        dataType: 'json',
        url: this.props.dataUrl,
        success: (response) => {
          this.setState({
            songs: response.songs,
            currentSongIndex: 0,
          })
        },
      })
    } else if (this.props.songs) {
      this.setState({
        songs: this.props.songs,
        currentSongIndex: 0,
      });
    } else {
      throw new Error('no data')
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.isPlaying && this.state.currentSongIndex !== prevState.currentSongIndex) {
      this.initSoundObject();
    }
  }

  render() {
    const songCount = this.songCount()
    let percent = 0
    if (this.state.seek && this.state.duration) {
      percent = this.state.seek / this.state.duration
    }

    return (
      <div className="audio-player">
        <ButtonPanel isPlaying={this.state.isPlaying} isPause={this.state.isPause}
          isLoading={this.state.isLoading}
          currentSongIndex={this.state.currentSongIndex} songCount={songCount}
          onPlayBtnClick={this.onPlayBtnClick.bind(this)} onPauseBtnClick={this.onPauseBtnClick.bind(this)}
        />
        <ProgressBar percent={percent} seekTo={this.seekTo.bind(this)} isPlaying={this.state.isPlaying}/>
      </div>
    );
  }

  onPlayBtnClick() {
    console.log('AudioPlayer.onPlayBtnClick')
    if (this.state.isPlaying && !this.state.isPause) {
      return;
    }
    this.play();
  }

  onPauseBtnClick() {
    console.log('AudioPlayer.onPauseBtnClick')
    const isPause = !this.state.isPause
    this.setState({ isPause })
    if (isPause) {
      this.pause()
    } else {
      this._play()
    }
  }

  play() {
    this.setState({ isPlaying: true, isPause: false });

    if (!this.howler) {
      this.initSoundObject();
    } else {
      const songUrl = this.state.songs[this.state.currentSongIndex].url;
      if (songUrl !== this.howler._src) {
        this.initSoundObject();
      } else {
        this._play();
      }
    }
  }

  initSoundObject() {
    this.clearSoundObject();
    this.setState({ isLoading: true });

    const song = this.state.songs[this.state.currentSongIndex];
    this.howler = new Howl({
      src: song.url,
      volume: this.state.volume,
      autoplay: false,
      onload: this.initSoundObjectCompleted.bind(this),
      onend: this.playEnd.bind(this),
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
      isLoading: false,
    });
  }

  _play() {
    this.howler.play();
    this.stopUpdateCurrentDuration();
    this.updateCurrentDuration();
    this.interval = setInterval(this.updateCurrentDuration.bind(this), 1000);
  }

  playEnd() {
    this.stop()
  }

  stop() {
    this.stopUpdateCurrentDuration();
    this.setState({ seek: 0, isPlaying: false });
  }

  pause() {
    this.howler.pause();
    this.stopUpdateCurrentDuration();
  }

  updateCurrentDuration() {
    this.setState({ seek: this.howler.seek() });
  }

  stopUpdateCurrentDuration() {
    clearInterval(this.interval);
  }

  seekTo(percent) {
    const seek = this.state.duration * percent;
    this.howler.seek(seek);
    this.setState({ seek });
  }

  songCount() {
    return this.state.songs ? this.state.songs.length : 0;
  }
}
AudioPlayer.defaultProps = {
  songs: [],
}

export default AudioPlayer
