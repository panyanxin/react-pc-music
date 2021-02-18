import React, { memo } from 'react'
import { renderRoutes } from 'react-router-config';

import routes from './router'

import { HashRouter } from 'react-router-dom';


import AppFooter from '@/components/app-footer'
import AppHeader from '@/components/app-header'

export default memo(function App() {
  console.log(routes)
  return (
    <HashRouter>
      <AppHeader />
      {renderRoutes(routes)}
      <AppFooter />
    </HashRouter>
  )
})