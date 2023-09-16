// import  {useState, useEffect} from 'react'
// import Spinner from '../assets/blocks-shuffle-3.svg'
// import Movies from "./Movies"



// export default function SearchPage({searchText}) {
//     const [search, setSearh] = useState(false)
//     const [searchError, setSearchError]= useState(false)
    

//     useEffect(() => {
//         log
//         searchMovies(searchText)
//         .then(res=>setSearh(res.data))
//         .catch(err=>{
//             console.log(err);
//             setSearchError(err)
//         })
//     },[searchError])

//     // const Spinner = 
//     // const ErrorDisplay = 
//     return (

//         searchError? 
//         <div className="">
//         <p className="text-red-100">{ "error.message"}</p>
//         </div> :
//         !search?
//          <div className="h-10 w-full flex justify-center items-center">
//         {/* <img className='w-30 h-30' src={Spinner} alt="spinner" /> */}
//             <p className="text-black">Loading...</p>
    
//         </div>:
//         <Movies movies={search} />    
//     )
// }





// async function searchMovies(query) {  
//     const uriQuery = encodeURIComponent(query)
//     console.log(uriQuery);
//     const searchUrl='https://api.themoviedb.org/3/search/movie?query='+uriQuery+'&include_adult=false&language=en-US&page=1'
     
//     const headers=
//      {
//        accept: 'application/json',
//        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NWJhNDE3ZTc1NjU5ZDFkZWMyOTFjMjNjNWNjZTE3OCIsInN1YiI6IjYxZWI3N2U0OTQ0YTU3MDA0MzVhMWI1MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.tEewROreqmHUdeZTmHH43RzySOLrmETYMGMToI_-Zw8'
//      }
//      const searchResults= await axios.get(url,[headers] )
//      return searchResults
  
//   }




