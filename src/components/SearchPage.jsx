import  {useState, useEffect} from 'react'
import Spinner from '../assets/blocks-shuffle-3.svg'
import Movies from "./Movies"
import ErrorFallBack from "./error/ErrorFallback"


import {useMovieContext} from './context/MovieContext'
import axios from 'axios'


export default function SearchPage() {
 const {searchText, poster, setPoster, search, setSearch} = useMovieContext()
 const [error, setError] =useState(false) 
 const [page, setPage]= useState(0)

    useEffect(() => {
        (async function(){
            try{
                const res= await searchMovies(searchText)
                console.log(res.data)
                setSearch(res.data.results)
            }
            catch(err){
                console.error(err);
                setError(err)
            }
        })()
       
    },[searchText])

  
    return (
        <div className=""> 
        {
            error? <ErrorFallBack error={error} setError={setError} />
            :!search?
             <div className="h-24 w-full flex justify-center" >
                <p className="text-black">Loading...</p>
            </div>
            :<> 
                 <div className="pt-20 pb-8">
                    <p className="results text-black text-center text-base md:text-xl font-bold">Search Results</p>
                    <Movies movies={search} showFeat={false} /> 
                </div>   
            </>
     }
    </div> 

    )
}





async function searchMovies(query) {  
    const uriQuery = encodeURIComponent(query)
    console.log(uriQuery);
    const searchUrl='https://api.themoviedb.org/3/search/movie?query='+uriQuery+'&include_adult=false&language=en-US&page=1'
     
    const headers=
     {
       accept: 'application/json',
       Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NWJhNDE3ZTc1NjU5ZDFkZWMyOTFjMjNjNWNjZTE3OCIsInN1YiI6IjYxZWI3N2U0OTQ0YTU3MDA0MzVhMWI1MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.tEewROreqmHUdeZTmHH43RzySOLrmETYMGMToI_-Zw8'
     }
     const searchResults= await axios.get(searchUrl,[headers] )
     return searchResults
  
  }




