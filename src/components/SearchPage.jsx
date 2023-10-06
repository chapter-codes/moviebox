import  {useState, useEffect} from 'react'
import Spinner from '../assets/blocks-shuffle-3.svg'
import Movies from "./Movies"
import Poster from "./Poster"

import {useMovieContext} from './context/MovieContext'
import axios from 'axios'


export default function SearchPage() {
 const {searchText, poster, setPoster, search, setSearch} = useMovieContext()
 const [error, setError] =useState(false) 
 const [page, setPage]= useState(0)

    useEffect(() => {
        searchMovies(searchText)
        .then(res=>{
        	console.log(res.data)
	       	setSearch(res.data.results)
        })

        .catch(err=>{
            console.error(err);
            setError(err)
        })
    },[searchText])

  
    return (

        error? 
        <div className="h-24 w-full flex justify-center">
        <p className="text-red-500 text-center">{ error.message}</p>
        </div> :
        !search?
         <div className="h-24 w-full flex justify-center" >
            <p className="text-black">Loading...</p>
    
        </div>:
        <>
        <Poster poster={search.slice(0,1).length==0? poster : search.slice(0,1)[0] } />
        <Movies movies={search} />    
        	
        </>
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




