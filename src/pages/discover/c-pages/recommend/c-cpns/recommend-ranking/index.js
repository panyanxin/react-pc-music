import React, { memo, useEffect, useRef } from 'react';

import ThemeHeaderRCM from '@/components/theme-header-rcm';
import { RankingWrapper } from './style';

export default memo(function RecomendRanking() {
  return (
    <RankingWrapper>
      <ThemeHeaderRCM title="榜单" />
    </RankingWrapper>
  )
})
