import React from 'react'
import ReactDOM from 'react-dom/client'
import axios from 'axios';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from './App.jsx'
import Movie from './components/Movie'
import RouteErrorPage from "./RouteErrorPage.jsx";

import './index.css'


axios.defaults.baseURL ='https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1'
axios.defaults.headers.common['Authorization'] = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NWJhNDE3ZTc1NjU5ZDFkZWMyOTFjMjNjNWNjZTE3OCIsInN1YiI6IjYxZWI3N2U0OTQ0YTU3MDA0MzVhMWI1MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.tEewROreqmHUdeZTmHH43RzySOLrmETYMGMToI_-Zw8'


const router = createBrowserRouter([
  {
    path: "/",
    element: <App /> ,
    errorElement: <RouteErrorPage />,

  },
  {
    path: "movies/:movieId",
    element: <Movie />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <RouterProvider router={router} />
  </React.StrictMode>,
)



