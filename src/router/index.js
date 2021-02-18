import Discover from '@/pages/discover'
import Mime from "@/pages/mine";
import Friend from "@/pages/friend";

const routes = [
  {
    path: '/',
    exact: true,
    components : Discover
  },
  {
    path: '/friend',
    components : Friend
  },
  {
    path: '/mine',
    components : Mime
  }
]

export default routes