// Layouts
import { HeaderOnly } from "~/components/Layout"

// Pages
import Home from "~/pages/Home"
import Following from "~/pages/Following"
import Explore from "~/pages/Explore"
import Profile  from "~/pages/Profile"
import Upload from "~/pages/Upload"
import Search from "~/pages/Search"

// public roures: các trang không cần đăng nhập vẫn xem được
const publicRoutes = [
    { path: "/", component: Home },
    { path: "/following", component: Following },
    { path: "/explore", component: Explore }, 
    { path: "/profile", component: Profile },
    { path: "/upload", component: Upload, layout: HeaderOnly },
    { path: '/search', component: Search, layout: null },
]

const privateRoutes = [

]

export { publicRoutes, privateRoutes }