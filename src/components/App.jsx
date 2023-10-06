import {useState, useEffect} from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import axios from 'axios'

import Poster from './Poster'
import Movies from './Movies'
import SearchPage from './SearchPage'
import Footer from './standalone/Footer'
import Loading from './standalone/Loading'
import ErrorFallback from './error/ErrorFallback'
import {useMovieContext} from './context/MovieContext'

export default function App (){
   const {poster, setPoster, movies, setMovies, state, setState, error, setError}= useMovieContext()  
   
    useEffect(()=>{
            loadMovies()
            .then(res=>{
                const data={...res.data}
                console.log(data)
                const latestFetchedMovie =data.results.map(movie=>movie.release_date).sort().at(-1)
                const posterData= data.results.filter(movie=>movie.release_date==latestFetchedMovie)
                const moviesList= data.results.splice(0, 10)
                
                setPoster(...posterData)
                setMovies(moviesList)
                setState("resolved")
                
            })
            .catch(err=> setError(err))

    }, [])

  return(
    <>
        {
            error? <ErrorFallback
                     err={error}
                     setError={setError}
                    />
           : state=='loading'? <><Loading /></>
           : state=='searchFocused'?
            <>
                <SearchPage />
                <Footer />
            </>
           : state=='resolved'? <>
                <Poster poster={poster} />
                <Movies movies={movies} />
                <Footer />
            </>
           : null
        }
    </>
  )
}

async function loadMovies(url){    
   const headers=
    {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NWJhNDE3ZTc1NjU5ZDFkZWMyOTFjMjNjNWNjZTE3OCIsInN1YiI6IjYxZWI3N2U0OTQ0YTU3MDA0MzVhMWI1MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.tEewROreqmHUdeZTmHH43RzySOLrmETYMGMToI_-Zw8'
    }
    

    const movies= await axios.get(url,[headers] )
    return movies 

}