import { useEffect, useState } from 'react'
import './App.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'


import Root from './components/root';
import Home from './pages/home';
import ErrorPage from "./error-page";
import Login from './pages/login';
import { mmLogin } from './api/mm_login';
import { SET_TOKEN } from './store/slice';
import { apiRequest } from './api/apiRequest';
import ResultTable from './components/ResultTable';


function App() {
  const token = useSelector(state => state.data.token)
  const [tokenValid, setTokenValid] = useState(true)
  // console.log(token)
  const dispatch = useDispatch();

  useEffect(() => {
      mmLogin(token).then(result => {
        dispatch(SET_TOKEN(result))
    });
   }, []);


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
                                  {
                                    path: "/result",
                                    element: <ResultTable/>,
                                  },
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
