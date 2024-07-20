import Layout from "@/pages/Layout/Layout"
import Month from "@/pages/Month/Month"
import New from "@/pages/New/New"
import Year from "@/pages/Year/Year"
import { createBrowserRouter } from "react-router-dom"

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Month /> 
      },
      {
        path: 'year',
        element: <Year /> 
      }
    ]
  },
  {
    path: '/new',
    element: <New />
  }
])

export default router