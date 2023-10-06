import { useEffect, useState } from "react"
import axios from "axios"
import Loading from "../standalone/Loading"
import ErrorFallback from "../error/ErrorFallback"
import { useParams, NavLink, useNavigate } from 'react-router-dom'


import Logo from '../../assets/tv.svg'
import Home from '../../assets/Home.svg'
import MovieProjector from '../../assets/Movie Projector.svg'
import TVShow from '../../assets/TV Show.svg'
import Calendar from '../../assets/Calendar.svg'
import Logout from '../../assets/Logout.svg'
import Play from '../../assets/Play.svg'
import Star from '../../assets/Star.svg'
import Tickets from '../../assets/two-tickets.svg'
import MoreOptions from '../../assets/more-options.svg'
import List from '../../assets/List.svg'
// import TopRated from '../../assets/top-rated.svg'
import MovieStats from '../../assets/movie-stats.svg'





export default function Movie() {
    const [movie, setMovie]= useState('')
    const [loading, setLoading]= useState(true)
    const [error, setError] = useState(false)
    const [navMovieId, setnavMovieId] = useState(null)

    const { movieId } = useParams()   
    const navigateTo = useNavigate();
    const imageBaseUrl = 'https://image.tmdb.org/t/p/original/'
    const upcomingImageUrl = 'https://image.tmdb.org/t/p/w500/'
    const linkStyle="font-bold flex items-center text-[#666666]  pl-8 py-2"
    
    const releaseDate= movie? movie.release_date :'' //movie from state
    const utcYear = releaseDate ? new Date(releaseDate).getUTCFullYear() : ''
    // console.log(movie);
    // console.log('movie id: ' +movieId);


    function navigateToMovie(event) {
        setnavMovieId(event.target.id)
    }
    useEffect(() => {
        navMovieId ? (navigateTo("/movies/" + navMovieId), window.location.reload()) : null
    }, [navMovieId])
   
    useEffect(() => {
        if (error) return;

        loadMovie(movieId)
        .then(movie=> {
            loadMovieCredits(movieId)
            .then(credits => {
                const cast = [...credits.data.cast]
                const crew = [...credits.data.crew]                    
                const sortedCast = cast.sort((a, b) => a.order < b.order).slice(0,4).map(cast=> cast.name)
                const directors = crew.filter(item => item.job == "Director").map(item => item.name)
                const writers= crew.filter(item => item.job == "Writer").map(item => item.name)
                loadUpcominvgMovies(movieId)
                .then(res => {
                        const threeupcomingMovies = res.data.results.slice(0, 3).map(item => {
                            
                            return {upcomingBackdrop:item.backdrop_path, upcomingID:item.id}
                        })
                    threeupcomingMovies.length == 0 ? setError({ message: 'Movie details could not be found' }) : null
                    
                    setMovie({...movie.data, sortedCast, directors, writers, threeupcomingMovies})
                    setLoading(false)

                })  
                .catch(err => {
                    console.error('error in three upcoming Movies movies', err)
                    setError(err)
                })                
            
            })
            .catch(err=>{
                console.error('credits error', err)
                setError(err)
            })
        })
        .catch(err=>{
            console.error('fetch movie error', err)
            setError(err)
        })


    },[error])

  return (
    error? <ErrorFallback err={error} setError={setError} /> :
    loading? <Loading /> : 
    <div className="flex h-full w-full "> 
       <div className="sidebar flex flex-col w-auto justify-evenly rounded-3xl border-r-[1px] border-black mdw-[180px]  md:h-screen md:fixed ">
       <p className=" flex justify-center items-center text-[#333333] px-2 mt-6 mb-4 font-bold  ">
        <img  className="w-[55px] h-[55px] pr-4 " src={Logo} alt="home icon" /> MovieBox</p>


        <NavLink to='/' className={"font-bold flex items-center  text-[#666666]  pl-8 py-2 "}><img  className="w-[40px] h-[40px] pr-4 " src={Home} alt="home icon" /> Home</NavLink>
        <NavLink to='/movies/'   className={({ isActive }) => (isActive ? linkStyle+'border-[2px] border-[#BE123C]   text-[#BE123C]"' : linkStyle)}><img className="w-[40px] h-[40px] pr-4" src={MovieProjector} alt="home icon" /> Movie</NavLink>
        <NavLink  to='/series'className=" font-bold flex items-center text-[#666666]  pl-8 py-2"><img  className="w-[40px] h-[40px] pr-4"src={TVShow} alt="home icon" /> TV Series</NavLink>
        <NavLink to='/upcoming' className=" font-bold flex items-center text-[#666666]  pl-8 py-2"><img  className="w-[40px] h-[40px] pr-4"src={Calendar} alt="home icon" />Upcoming</NavLink>

        <div className="border-[#BE123CB2] border-[1px] rounded-2xl mx-2 bg-[#FEE2E2]">
            <p className="px-4 mt-8 font-bold text-sm text-[#333333CC] max-w-[172px] ">
            Play movie quizes and earn free tickets 
            </p>
            <p className="px-4 py-1 text-[#666666] text-xs ">50k people are playing now</p>
            
            <p className="m-6 p-2 rounded-full text-[#BE123C] bg-[#BE123C33] text-center">Start playing</p>
        </div>

        <p  className="font-bold flex items-center text-[#666666]  pl-8 py-2"><img  className="w-[40px] h-[40px] pr-4"src={Logout} alt="home icon" />Logout</p>
       </div>

        <div className="movie  grow px-2 pt-6 md:px-8 md:ml-[180px]">
            <div className={`poster w-full h-[40vh] md:h-[45vh] relative`}>
                <img className='absolute w-full  h-full top-0 left-0 rounded-2xl overflow-hidden object-cover' src={imageBaseUrl+ movie.backdrop_path} alt="movie poster" />

                <div className="watch-trailer absolute w-full h-full flex flex-col justify-center items-center top-0 left-0">
                <   div className="play flex items-center justify-center rounded-full w-20 h-20 bg-[#E5E7EB] opacity-60 hover:opacity-80">
                      <img src={Play} alt="watch trailer" />
                    </div>
                    <p className="text-sm py-2">watch trailer</p>
                </div>
                
            </div>
            <div className="flex justify-between items-center pt-2 ">
                <div className="left flex gap-2">
                    <p className=" font-bold text-[#404040] text-sm" data-testid='movie-title'>{movie.title}</p>
                    <div className=" font-bold dot text-[#404040] text-[1.5rem] leading-[9px] ">.</div>
                    <p className=" font-bold text-[#404040] text-sm" data-testid='movie-release-date'>{utcYear}</p>
                    <div className="dot text-[#404040] text-[1.5rem] leading-[9px] ">.</div>
                    <p className=" font-bold text-[#404040] text-sm">{movie.adult?'PG-18': 'PG-13'}</p>
                    <div className="dot text-[#404040] text-[1.5rem] leading-[9px]">.</div>
                    <p className=" font-bold text-[#404040] text-sm" data-testid='movie-runtime'>{String(Math.floor(movie.runtime/60)).padStart(2,0)+'h'}  {String(Math.floor(movie.runtime%60)).padStart(2, '0') +'m'}</p>
                    <div className="flex items-center gap-2">
                        {
                            movie.genres.map(genre=><p className="text-[#B91C1C] text-[10px] py-1 font-bold border-[1px] border-[#F8E7EB] rounded-full  px-2" key={genre.id}>{genre.name}</p>)
                        }    

                    </div>
            

                </div>
                <div className="left flex justify-center items-center gap-2">
                    <img src={Star} alt="rating" className="w-[20px] h-[20px]" />
                    <p className="text-[#E8E8E8] text-xs">{movie.vote_average.toFixed(1)}</p>
                    <p className="text-[#666666] text-sm font-bold pl-2 border-l-[2px] border-[#666666] ">{(movie.vote_count/1000).toFixed(2)}K</p>
                </div>


            </div>
            <div className="overview-section mt-4 gap-2 flex justify-between">
                <div className="left w-[60%] grow">
                    <p className="overview text-[#333333] pr-10" data-tesid="movie-overview" >{movie.overview}</p>
                    <p className="text-[14px] text-[#333333] font-[500] my-4 ">Directors: <span className=" text-[#BE123C]">{movie.directors.join(', ')}</span></p>
                    <p className="text-[14px] text-[#333333] font-[500] mb-4">Writers: <span className=" text-[#BE123C]">{movie.writers.join(', ')}</span></p>
                    <p className="text-[14px] text-[#333333] font-[500] ">Stars:  <span className=" text-[#BE123C]">{movie.sortedCast.join(', ')}</span></p>
                    <div className="rating mt-6 pr-10">
                        <img src={MovieStats} alt=" rating statistics" className="h-16 w-auto" />    
                     </div>    
                </div>
                <div className="right flex flex-col gap-1 items-end">
                    <div className="">
                        <img className="h-10 w-full max-w-12 pb-2" src={Tickets} alt="tickets" />
                        <img className="h-10 w-full max-w-12 pb-2" src={MoreOptions} alt="more options"/>   
                    </div>
                     
                    <div className="recommended  w-full relative ">
                           <div className="rec-images h-48 w-52 rounded-lg overflow-hidden flex gap-1">    
                             {movie.threeupcomingMovies.map(item=> <div className="h-full w-auto" key={item.upcomingID} onClick={navigateToMovie}><img className="h-full w-full object-cover" src={upcomingImageUrl+item.upcomingBackdrop} id={item.upcomingID} alt="recommended movie" /></div>)}

                            </div>    
                            <div className="shows  w-full h-8 absolute bottom-0 left-0 flex gap-1 items-center rounded-b-lg bg-[#12121280]">
                                <img src={List} alt="recommended shows" className="w-[20px] h-[20px]" />   
                                <p className=" tex-white text-[9px]">The Best Movies and Shows in September</p>      
                            </div>      
                              
                    </div>         
                </div>
            </div>

        </div>


    </div>
  )
}



async function loadMovie(movieId){    
    const movieUrl='https://api.themoviedb.org/3/movie/'+movieId
    const headers=
     {
       accept: 'application/json',
       Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NWJhNDE3ZTc1NjU5ZDFkZWMyOTFjMjNjNWNjZTE3OCIsInN1YiI6IjYxZWI3N2U0OTQ0YTU3MDA0MzVhMWI1MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.tEewROreqmHUdeZTmHH43RzySOLrmETYMGMToI_-Zw8'
     }
     
 
     const movies= await axios.get(movieUrl,[headers] )
     return movies 
 
 }

 async function loadMovieCredits(movieId){    
     const creditsUrl = `https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-US`
     const headers=
     {
       accept: 'application/json',
       Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NWJhNDE3ZTc1NjU5ZDFkZWMyOTFjMjNjNWNjZTE3OCIsInN1YiI6IjYxZWI3N2U0OTQ0YTU3MDA0MzVhMWI1MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.tEewROreqmHUdeZTmHH43RzySOLrmETYMGMToI_-Zw8'
     }
     
 
     const credits= await axios.get(creditsUrl, [headers] )
     return credits 
 
 }
 

 async function loadUpcominvgMovies(movieId){    
    const upcomingMoviesUrl = `https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1'`  
    const headers=
    {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NWJhNDE3ZTc1NjU5ZDFkZWMyOTFjMjNjNWNjZTE3OCIsInN1YiI6IjYxZWI3N2U0OTQ0YTU3MDA0MzVhMWI1MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.tEewROreqmHUdeZTmHH43RzySOLrmETYMGMToI_-Zw8'
    }
    

    const upcomingMovies= await axios.get(upcomingMoviesUrl, [headers] )
    return upcomingMovies

}
 

//  {
//     "adult": false,
//     "backdrop_path": "/5mzr6JZbrqnqD8rCEvPhuCE5Fw2.jpg",
//     "belongs_to_collection": {
//         "id": 742536,
//         "name": "The Meg Collection",
//         "poster_path": "/7sAnVGMn5he5NZBZCE6fhDpA7fl.jpg",
//         "backdrop_path": "/rNoyJmjdhgn30bVbvd8n3DJMocB.jpg"
//     },
//     "budget": 129000000,
//     "genres": [
//         {
//             "id": 28,
//             "name": "Action"
//         },
//         {
//             "id": 878,
//             "name": "Science Fiction"
//         },
//         {
//             "id": 27,
//             "name": "Horror"
//         }
//     ],
//     "homepage": "https://www.themeg.movie",
//     "id": 615656,
//     "imdb_id": "tt9224104",
//     "original_language": "en",
//     "original_title": "Meg 2: The Trench",
//     "overview": "An exploratory dive into the deepest depths of the ocean of a daring research team spirals into chaos when a malevolent mining operation threatens their mission and forces them into a high-stakes battle for survival.",
//     "popularity": 2943.17,
//     "poster_path": "/4m1Au3YkjqsxF8iwQy0fPYSxE0h.jpg",
//     "production_companies": [
//         {
//             "id": 56242,
//             "logo_path": "/1YORRYmg7hgYIgoJek8jU3cykuQ.png",
//             "name": "Apelles Entertainment",
//             "origin_country": "US"
//         },
//         {
//             "id": 174,
//             "logo_path": "/IuAlhI9eVC9Z8UQWOIDdWRKSEJ.png",
//             "name": "Warner Bros. Pictures",
//             "origin_country": "US"
//         },
//         {
//             "id": 435,
//             "logo_path": "/AjzK0s2w1GtLfR4hqCjVSYi0Sr8.png",
//             "name": "di Bonaventura Pictures",
//             "origin_country": "US"
//         },
//         {
//             "id": 92484,
//             "logo_path": "/dfWwoWRp8snHjzDKO5IFkiCAUe7.png",
//             "name": "CMC Pictures",
//             "origin_country": "CN"
//         },
//         {
//             "id": 208093,
//             "logo_path": null,
//             "name": "DF Pictures",
//             "origin_country": ""
//         },
//         {
//             "id": 208094,
//             "logo_path": null,
//             "name": "Onaroll Productions",
//             "origin_country": ""
//         }
//     ],
//     "production_countries": [
//         {
//             "iso_3166_1": "CN",
//             "name": "China"
//         },
//         {
//             "iso_3166_1": "US",
//             "name": "United States of America"
//         }
//     ],
//     "release_date": "2023-08-02",
//     "revenue": 384056482,
//     "runtime": 116,
//     "spoken_languages": [
//         {
//             "english_name": "English",
//             "iso_639_1": "en",
//             "name": "English"
//         }
//     ],
//     "status": "Released",
//     "tagline": "Back for seconds.",
//     "title": "Meg 2: The Trench",
//     "video": false,
//     "vote_average": 7.02,
//     "vote_count": 1669
// // }
