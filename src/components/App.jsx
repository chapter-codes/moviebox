import {useState, useEffect} from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import axios from 'axios'


import Poster from './Poster'
import Movies from './Movies'
import SearchPage from './SearchPage'
import Footer from './standalone/Footer'
import Loading from './standalone/Loading'
import Header from './standalone/Header'
import ErrorFallback from './error/ErrorFallback'
import {useMovieContext} from './context/MovieContext'

export default function App (){
   const {poster, setPoster, movies, setMovies, state, setState, error, setError}= useMovieContext()  
   
   
    useEffect(()=>{
        (async function(){

            try{

            const res=await loadMovies()
            const data={...res.data}
            console.log(data)
            const latestFetchedMovie =data.results.map(movie=>movie.release_date).sort().at(-1)
            const posterData= data.results.filter(movie=>movie.release_date==latestFetchedMovie)
            const moviesList= data.results
            // const moviesList= data.results.splice(0, 10)

            
            setPoster(...posterData)
            setMovies(moviesList)
            setState("resolved")
            }catch(err){
            setError(err)
            }
        })()
            
    }, [error])

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
                   <Header/>
                   <SearchPage /> 
                   <Footer/>
                </>
           :state=='resolved'?
                <> 
                    <Header />
                    <Poster />
                    <Movies movies={movies}/>
                    <Footer />
                </>
            : <p className="text-red-500 text-3xl">Impossible state</p>           
        }
    </>
  )
}

async function loadMovies(){    
    //url is already set in the main.jsx file
   const headers=
    {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NWJhNDE3ZTc1NjU5ZDFkZWMyOTFjMjNjNWNjZTE3OCIsInN1YiI6IjYxZWI3N2U0OTQ0YTU3MDA0MzVhMWI1MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.tEewROreqmHUdeZTmHH43RzySOLrmETYMGMToI_-Zw8'
    }

    const movies= await axios.get(null,[headers] )
    return movies 

}