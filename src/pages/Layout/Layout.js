import { Outlet } from "react-router-dom"

function Layout() {
  return (
    <div>
      <Outlet />
      我是Layout
    </div>
  )
}

export default Layout