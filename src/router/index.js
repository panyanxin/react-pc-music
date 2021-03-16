import React from 'react';
import { Redirect } from "react-router-dom";

// const Discover = React.lazy(() => import("@/pages/discover"));
// const Mime = React.lazy(() => import("@/pages/mine"));
// const Friend = React.lazy(() => import("@/pages/friend"));
import Discover from "../pages/discover";
import Mime from "../pages/mine";
import Friend from "../pages/friend";

const routes = [
  {
    path: '/',
    exact: true,
    component : Discover
  },
  {
    path: '/friend',
    component : Friend
  },
  {
    path: '/mine',
    component : Mime
  }
]

export default routes;
