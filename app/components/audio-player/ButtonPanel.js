import React from 'react'
import IcoCuffie from '../../images/player_headphones.svg'
import IcoPausa from '../../images/player_pause.svg'
import IcoPlay from '../../images/player_play.svg'

const ButtonPanel = (props) => {
  const { isPlaying, isPause } = props
  const isShowPlayBtn = !isPlaying || isPause
  const buttonClickHandler = isShowPlayBtn ? props.onPlayBtnClick : props.onPauseBtnClick

  return (
    <div role="button" onClick={buttonClickHandler}>
      {isPause ?
        <IcoPlay className="icoAudioButton"/>
        : isPlaying ?
          <IcoPausa className="icoAudioButton"/>
          : <IcoCuffie className="icoAudioButton"/>
      }
    </div>
  )
}
export default ButtonPanel
