import {useState, useEffect} from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import axios from 'axios'

import Loading from './Loading'
import Poster from './Poster'
import Movies from './Movies'
import Footer from './standalone/Footer'
import ErrorFallback from './ErrorFallback'
// import SearchPage from './SearchPage'



export default function App (){
    const [loading, setLoading]=useState(true)
    const [poster, setPoster]=useState('')
    const [movies, setMovies]    =useState('')
    const [error, setError]    =useState(false)
    const [searchText, setSearchText] = useState('')

 
   

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
                setLoading(false)
                
            })
            .catch(err=> setError(err))

    }, [error])

  return(
    <>
        {
        error?<ErrorFallback err={error} setError={setError}/>

       : loading? <><Loading /></>:
        <>
              <Poster poster={poster} searchText={searchText} setSearchText={setSearchText} />
              {
                // searchText ? <SearchPage searchText={searchText} /> : <Movies movies={movies} />
                <Movies movies={movies}   />
                

              }
              
          <Footer />
        
          
        </>
}
</>
  )


}
{/*   */}

async function loadMovies(url){    
   
   const headers=
    {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NWJhNDE3ZTc1NjU5ZDFkZWMyOTFjMjNjNWNjZTE3OCIsInN1YiI6IjYxZWI3N2U0OTQ0YTU3MDA0MzVhMWI1MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.tEewROreqmHUdeZTmHH43RzySOLrmETYMGMToI_-Zw8'
    }
    

    const movies= await axios.get(url,[headers] )
    return movies 

}