import React, { memo, useEffect, useRef, useState, useCallback } from 'react'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import { Slider, message } from 'antd';

import { getSizeImage, formatDate, getPlaySong } from '@/utils/format-utils';

import { 
  getSongDetailAction,
  // changeSequenceAction,
  // changeCurrentIndexAndSongAction,
  // changeCurrentLyricIndexAction 
} from '../store/actionCreators';
import {
  PlaybarWrapper,
  Control,
  PlayInfo,
  Operator
} from './style';
export default memo(function AppPlayerBar() {
  // props and state
  const [currentTime, setCurrentTime] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isChanging, setIsChanging] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const audioRef = useRef();

  // redux-hooks
  const { 
    currentSong, 
    // sequence, 
    // lyricList,
    // currentLyricIndex
  } = useSelector(state => ({
    currentSong: state.getIn(["player", "currentSong"]),
    // sequence: state.getIn(["player", "sequence"]),
    // lyricList: state.getIn(["player", "lyricList"]),
    // currentLyricIndex: state.getIn(["player", "currentLyricIndex"])
  }), shallowEqual);
  const dispatch = useDispatch()
  
  
  // other hooks
  useEffect(() => {
    dispatch(getSongDetailAction(167876))
  }, [dispatch])
  useEffect(() => {
    audioRef.current.src = getPlaySong(currentSong.id);
  }, [currentSong])

  // other handle
  const picUrl = (currentSong.al && currentSong.al.picUrl) || "";
  const singerName = (currentSong.ar && currentSong.ar[0].name) || "未知歌手";
  const duration = currentSong.dt || 0;
  const showDuration = formatDate(duration, "mm:ss");
  const showCurrentTime = formatDate(currentTime, "mm:ss");

  // orther func
  
  const handleMusicEnded = () => {

  }
  const changeMusic = (tag) => {
    // dispatch(changeCurrentIndexAndSongAction(tag));
  }
  const playMusic = useCallback(() => {
    isPlaying ? audioRef.current.pause(): audioRef.current.play();
    setIsPlaying(!isPlaying);
  }, [isPlaying]);

  const timeUpdate = (e) => { // 当前播放时间
    const currentTime = e.target.currentTime;
    if (!isChanging) {
      setCurrentTime(currentTime * 1000);
      setProgress(currentTime * 1000 / duration * 100);
    }
  }
  const sliderChange = useCallback((value) => {
    setIsChanging(true);
    setProgress(value);
  }, [])

  const sliderAfterChange = useCallback((value) => {
    const currentTime = value / 100 * duration / 1000;
    audioRef.current.currentTime = currentTime;
    setCurrentTime(currentTime * 1000);
    setIsChanging(false);

    if (!isPlaying) {
      playMusic();
    }
  }, [duration, isPlaying, playMusic]);
  
  return (
    <PlaybarWrapper className="sprite_player">
      <div className='content wrap-v2'>
        
        <Control isPlaying={isPlaying}>
          <button className="sprite_player prev"
                  onClick={e => changeMusic(-1)}></button>
          <button className="sprite_player play" 
                  onClick={e => playMusic()}></button>
          <button className="sprite_player next"
                  onClick={e => changeMusic(1)}></button>
        </Control>
        <PlayInfo>
          <div className='image'>
            <a href="#">
              <img src={getSizeImage(picUrl, 35)} alt=""/>
            </a>
          </div>
          <div className='info'>
            <div className='song'>
              <span className='song-name'>{currentSong.name}</span>
              <a href="#/" className='singer-name'>{singerName}</a>
            </div>
            <div className='progress'>
              <Slider 
                defaultValue={30} 
                value={progress}
                onChange={sliderChange}
                onAfterChange={sliderAfterChange}
              />
              <div className="time">
                <span className="now-time">{showCurrentTime}</span>
                <span className="divider">/</span>
                <span className="duration">{showDuration}</span>
              </div>
            </div>
          </div>
        </PlayInfo>
        <Operator>
          <div className="left">
            <button className="sprite_player btn favor"></button>
            <button className="sprite_player btn share"></button>
          </div>
          <div className="right sprite_player">
            <button className="sprite_player btn volume"></button>
            {/* onClick={e => changeSequence()} */}
            <button className="sprite_player btn loop" ></button>
            <button className="sprite_player btn playlist"></button>
          </div>
        </Operator>
      </div>
      <audio  
        ref={audioRef}
        onTimeUpdate={e => timeUpdate(e)} 
        onEnded={e => handleMusicEnded()}
      />
    </PlaybarWrapper>
  )
})
