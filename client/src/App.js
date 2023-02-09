import React from 'react'
import {createBrowserRouter,RouterProvider} from 'react-router-dom';


//?   Importing all Components   
import PageNotFound from './components/PageNotFound'
import Password from './components/Password'
import Profile from './components/Profile'
import Recovery from './components/Recovery'
import Register from './components/Register'
import Reset from './components/Reset'
import Username from './components/Username'

const router = createBrowserRouter([
  {
  path:'/',
  element : <Username> Root Route</Username>
  },
  {
    path:'/register',
    element : <Register> Register Route</Register>
    },
    {
      path:'/password',
      element : <Password> Register Route</Password>
      }, 
      {
        path:'/profile',
        element : <Profile> Register Route</Profile>
        },
        {
          path:'/recovery',
          element : <Recovery> Register Route</Recovery>
          },
          {
            path:'/reset',
            element : <Reset> Register Route</Reset>
            },
            {
              path:'*',
              element : <PageNotFound > Register Route</PageNotFound>
              }

])


export default  function App() {
  return (
    <main>
  <RouterProvider router={router}></RouterProvider>
   
    </main>
  );
}


