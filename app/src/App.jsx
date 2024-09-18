import { useState } from 'react'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'

import AdminDashboard from './Dashboard';
import Navbar from './Navbar'
import Add from './Add'
import Buy from './Buy';
import Cart from './Cart';
import Admin from './Admin'

function App() {
 
  const router=createBrowserRouter([
   
    {
      path:'/',
      element:    <><Navbar/><AdminDashboard/></>
    },
    {
      path:'/buy',
      element:    <><Navbar/><Buy/></>
    },
    {
      path:'/cart',
      element:    <><Navbar/><Cart/></>
    },
    
    {
      path:'/add',
      element:    <><Add/></>
    },
    {
      path:'/admin',
      element:    <><Admin/></>
    },
   
    
   
    
  ])
  return (
    <>
   <RouterProvider router={router} />
    </>
  )
}

export default App
