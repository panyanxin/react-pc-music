import React, { memo, useEffect,  } from 'react'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import { getTopBannerAction } from './store/actionCreators'

function Recommend(props) {
  // 1.组件和redux 关联, 获取数据和进行操作
  const {topBanners} = useSelector(state => ({
    // topBanners: state.recommend.topBanners
    // topBanners: state.get('recommend').get('topBanners')
    topBanners: state.getIn(['recommend', 'topBanners'])
  }), shallowEqual) 
  const dispatch = useDispatch()
  
  // 发送网络请求
  useEffect(() => {
    dispatch(getTopBannerAction())
  }, [dispatch])
    return (
    <div>
      <h2>Recommend: {topBanners.length}</h2>
    </div>
  )
}

export default memo(Recommend)

// 01. 使用redux
// import { connect } from 'react-redux'
// function Recommend(props) {
//   const {getBanners, topBanners} = props
//   useEffect(() => {
//     getBanners();
//   }, [getBanners])
//   return (
//     <div>
//       <h2>Recommend: {topBanners.length}</h2>
//     </div>
//   )
// }

// const mapStateToProps = state => ({
//   topBanners: state.recommend.topBanners
// });

// const mapDispatchToProps = dispatch => ({
//   getBanners: () => {
//     dispatch(getTopBannerAction())
//   }
// })

// export default connect(mapStateToProps, mapDispatchToProps)(memo(Recommend));