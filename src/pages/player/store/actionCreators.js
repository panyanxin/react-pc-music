import { getSongDetail, getLyric } from '@/services/player'

import { getRandomNumber } from '@/utils/math-utils'
import { parseLyric } from '@/utils/parse-lyric';

import * as actionTypes from './constants'
const changeCurrentSongAction = (currentSong) => ({
  type: actionTypes.CHANGE_CURRENT_SONG,
  currentSong
});

const changePlayListAction = (playList) => ({
  type: actionTypes.CHANGE_PLAY_LIST,
  playList
});

const changeCurrentSongIndexAction = (index) => ({
  type: actionTypes.CHANGE_CURRENT_SONG_INDEX,
  index
});

const changLyricListAction = (lyricList) => ({
  type: actionTypes.CHANGE_LYRIC_LIST,
  lyricList
})

// 对外暴露的action

export const changeSequenceAction = (sequence) => ({  // 修改播放模式
  type: actionTypes.CHANGE_SEQUENCE,
  sequence
});

export const changeCurrentIndexAndSongAction = (tag) => { // 修改当前播放歌曲
  return (dispatch, getState) => {
    const playList = getState().getIn(["player", "playList"])
    const sequence = getState().getIn(['player', 'sequence'])
    let currentSongIndex = getState().getIn(['player', 'currentSongIndex'])
    switch (sequence) {
      case 1: //随机播放
        let randomIndex = getRandomNumber(playList.length)
        while (randomIndex === currentSongIndex) {
          randomIndex = getRandomNumber(playList.length);
        }
        currentSongIndex = randomIndex;
        break
      default: // 其他播放 顺序 单曲
        currentSongIndex += tag
        if (currentSongIndex >= playList.length) currentSongIndex = 0
        if (currentSongIndex < playList.length) currentSongIndex = playList.length - 1
    }

    const currentSong = playList[currentSongIndex];
    dispatch(changeCurrentSongAction(currentSong));
    dispatch(changeCurrentSongIndexAction(currentSongIndex));
  }
}

export const getSongDetailAction = (ids) => { // 获取歌曲详情
  return (dispatch, getState) => {
    // 1.根据id查找playList中是否已经有了该歌曲
    const playList = getState().getIn(["player", "playList"]);
    const songIndex = playList.findIndex(song => song.id === ids);

    // 2. 判断是否找到歌曲
    let song = null;
    if (songIndex !== -1) { //查找歌曲
      dispatch(changeCurrentSongIndexAction(songIndex));
      song = playList[songIndex];
      dispatch(changeCurrentSongAction(song));
      dispatch(getLyricAction(song.id));
    } else { // 没有找到歌曲
      // 请求歌曲数据
      getSongDetail(ids).then((res) => {
        song = res.songs && res.songs[0];
        if (!song) return;

        // 1.将最新请求到的歌曲添加到播放列表中
        const newPlayList = [...playList];
        newPlayList.push(song);
        // 2.更新redux中的值
        dispatch(changePlayListAction(newPlayList));
        dispatch(changeCurrentSongIndexAction(newPlayList.length - 1));
        dispatch(changeCurrentSongAction(song));
      })

      // 3.请求歌词
      dispatch(getLyricAction(song.id));
    }

  }
}

export const getLyricAction = (id) => {
  return dispatch => {
    getLyric(id).then(res => {
      const lyric = res.lrc.lyric;
      const lyricList = parseLyric(lyric);
      dispatch(changLyricListAction(lyricList));
    })
  }
}
