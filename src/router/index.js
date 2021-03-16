import React from 'react';
import { Redirect } from "react-router-dom";

// const Discover = React.lazy(() => import("@/pages/discover"));
// const Mime = React.lazy(() => import("@/pages/mine"));
// const Friend = React.lazy(() => import("@/pages/friend"));
import Discover from "@/pages/discover";
import Album from "@/pages/discover/c-pages/album";
import Artist from "@/pages/discover/c-pages/artist";
import Djradio from "@/pages/discover/c-pages/djradio";
import Ranking from "@/pages/discover/c-pages/ranking";
import Recommend from "@/pages/discover/c-pages/recommend";
import Songs from "@/pages/discover/c-pages/songs";

import Mime from "../pages/mine";
import Friend from "../pages/friend";


const routes = [
  {
    path: '/',
    exact: true,
    render: () => (
      <Redirect to="/discover"/>
    )
  },
  {
    path: '/',
    component : Discover,
    routes: [
      {
        path: "/discover",
        exact: true,
        render: () => (
          <Redirect to="/discover/recommend"/>
        )
      },
      {
        path: "/discover/recommend",
        component: Recommend
      },
      {
        path: "/discover/ranking",
        component: Ranking
      },
      {
        path: "/discover/songs",
        component: Songs
      },
      {
        path: "/discover/djradio",
        exact: true,
        component: Djradio
      },
      {
        path: "/discover/artist",
        component: Artist
      },
      {
        path: "/discover/album",
        component: Album
      },
      // {
      //   path: "/discover/player",
      //   component: Player
      // }
    ]
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
