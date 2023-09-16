import { createLogger } from 'vite'
import Loading from './Loading'
import {useState, useEffect} from 'react'

const [searching, setSearching] =useState(true)
const [searchResults, setSearchResults] = useState(null)
const [searchError, setSearchError] =useState(null)


export default function SearchPage({ searchText }) {
    console.log(searchText)
//      useEffect(() => {
      
    
      
//     // !searchText ? null : 
//     //   searchMovies(searchText)
//     //   .then(res => {
//     //     setSearchResults(res.data.results)
//     //     setSearching(false)
//     //     setSearchText('')
//     //   })
//     //     .catch(err => {
//     //       console.log('search error', err);
//     //       setSearchError(err)
//     //     })
//   }, [searchText])
    
    return (
        <>
           searching? <Loading /> : null
        </>
    )
    

}


async function searchMovies(name) {  
    name = encodeURIComponent(name)
    console.log(name);
    const searchUrl='https://api.themoviedb.org/3/search/movie?query='+name+'&include_adult=false&language=en-US&page=1'
     
    const headers=
     {
       accept: 'application/json',
       Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NWJhNDE3ZTc1NjU5ZDFkZWMyOTFjMjNjNWNjZTE3OCIsInN1YiI6IjYxZWI3N2U0OTQ0YTU3MDA0MzVhMWI1MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.tEewROreqmHUdeZTmHH43RzySOLrmETYMGMToI_-Zw8'
     }
     const searchResults= await axios.get(url,[headers] )
     return searchResults
  
  }