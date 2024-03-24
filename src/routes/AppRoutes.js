import React from 'react'
import { Navigate, Route, Routes, } from 'react-router-dom'
import About from '../components/About'
import Login from '../components/Login'
import SignUp from '../components/SignUp'
import WayPoints from '../components/WayPoints'
import PrivateRoute from './PraviateRoute'
import Home from '../components/Home'
import Restaurants from '../components/Restaurants'
import MyReservations from '../components/Myreservations'
import Staffpage from '../components/Staffpage'
import Admin from '../components/Admin'

export default function AppRoutes() {

 const routes =[
    {
        path:"/about",
        page:"About",
        element:<About />,
        isPrivate:false,
        Key:"About"
    },
    {
        path:"/login",
        page:"Login",
        element:<Login />,
        isPrivate:false,
        Key:"Login"
    },
    {
        path:"/signup",
        page:"SignUp",
        element:<SignUp />,
        isPrivate:false,
        Key:"SignUp"
    },
    {
        path:"/dashboard",
        page:"dashboard",
        element:<WayPoints />,
        isPrivate:false,
        Key:"dashboard"
    },
    {
        path:"/home",
        page:"Home",
        element:<Home />,
        isPrivate:false,
        Key:"Home"
    },
    {
        path:"/restaurants",
        page:"Restaurants",
        element:<Restaurants />,
        isPrivate:false,
        Key:"Restaurants"
    },
    {
        path:"/myReservations",
        page:"MyReservations",
        element:<MyReservations />,
        isPrivate:false,
        Key:"MyReservations"
    },
    {
        path:"/staff",
        page:"Staffpage",
        element:<Staffpage />,
        isPrivate:false,
        Key:"Staffpage"
    },
    {
        path:"/admin",
        page:"Admin",
        element:<Admin />,
        isPrivate:false,
        Key:"Admin"
    }
 ]

  return (

    <Routes>
        {routes.map(({isPrivate,element,path})=>{
            return isPrivate?<Route  path={path} element={<PrivateRoute>
                {element}
              </PrivateRoute>}>
              </Route>:<Route exact path={path} element={element}/>
        })
        }
        <Route path="/" element={<Navigate to={"/home"}/>} />
    </Routes>
  )
}
