import { useEffect, useState } from 'react'
import './App.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Root from './components/root';
import Home from './pages/home';
import ErrorPage from "./error-page";
import Login from './pages/login';
import { mmLogin } from './config/mm_login';



function App() {
  useEffect(() => {
    console.log('APP useeffect')
    mmLogin();
  }, [])

const router = createBrowserRouter([
                  {
                    path: "/",
                    element: <Root />,
                      errorElement: <ErrorPage />,
                      children: [
                                  {
                                    path: "/",
                                    element: <Home/>,
                                  },
                                  {
                                    path: "/login",
                                    element: <Login/>,
                                  },
                                  // {
                                  //   path: "/form",
                                  //   element: <EntryForm/>,
                                  // },
                                  // {
                                  //   path: "/edit",
                                  //   element: <EditForm/>,
                                  // },
                                ]
                  },
]);
   
  return (
          <RouterProvider router={router} />
  )
}


export default App
