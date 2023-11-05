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
    error? <ErrorFallback error={error} setError={setError} />
    :loading? <Loading /> : 
    <div className="flex flex-col md:flex-row h-full w-full "> 
     <div className="sidebar-mobile flex justify-between md:hidden px-4 py-4">
            <p className="flex items-center gap-1 ">
                <img src={Logo}  className="w-8 h-8" alt="Logo" />
                <span className="text-[#333] text-sm font-bold md:text-base">Moviebox</span>
            </p>
            <div className="right flex gap-1 justify-end items-center items-center">
                <img src={Home} alt="Home" className="" onClick={()=>{navigateTo('/')}} />
                <img src={MovieProjector} alt="movies" className="" onClick={()=>{navigateTo('/movies')}} />
                <img src={TVShow} alt="tv series" className="" onClick={()=>{navigateTo('/series')}}  />
                <img src={Calendar} alt="upcoming" className="" onClick={()=>{navigateTo('/upcoming')}} />

            </div>
        </div>
       <div className="sidebar hidden md:flex  md:flex-col justify-evenly rounded-3xl border-r-[1px] border-black md:min-w-[180px] md:min-h-[600px] overflow-y-scroll  ">
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

        <div className="movie grow px-2 pt-2 pb-8">
            <div className={`poster w-full  min-h-[180px] md:min-h-[350px] md:h-[45vh] rounded-2xl overflow-hidden bg-cover bg-right-top flex items-center justify-center`} style={{'backgroundImage':`url('${imageBaseUrl+ movie.backdrop_path}')`}}>
                <div className="watch-trailer flex flex-col justify-center items-center">
                <   div className="play flex items-center justify-center rounded-full w-20 h-20 bg-[#E5E7EB] opacity-60 hover:opacity-80">
                      <img src={Play} alt="watch trailer" />
                    </div>
                    <p className="text-sm py-2">watch trailer</p>
                </div>
                
            </div>
            <div className="flex flex-col justify-between md:flex-row md:items-center pt-2 ">
                <div className="left flex flex-col lg:flex-row flex-wrap gap-2 lg:w-full">
                    <p className=" font-bold text-[#404040] text-sm" data-testid='movie-title'>{movie.title}</p>
                    <div className="info-wrapper flex gap-2">
                        <div className="flex">
                            <div className=" font-bold dot  text-[#404040] text-[1.5rem] leading-[9px] ">.</div>
                            <p className=" font-bold text-[#404040] text-sm" data-testid='movie-release-date'>{utcYear}</p>
                        </div>
                        <div className="flex">
                            <div className="dot font-bold text-[#404040] text-[1.5rem] leading-[9px] ">.</div>
                            <p className=" font-bold text-[#404040] text-sm">{movie.adult?'PG-18': 'PG-13'}</p>
                        </div>
                        <div className="flex">
                            <div className="dot font-bold text-[#404040] text-[1.5rem] leading-[9px]">.</div>
                            <p className=" font-bold text-[#404040] text-sm" data-testid='movie-runtime'>{String(Math.floor(movie.runtime/60)).padStart(2,0)+'h'}  {String(Math.floor(movie.runtime%60)).padStart(2, '0') +'m'}</p>
                        </div>
                    </div>
                        
                    <div className=" grow flex justify-between gap-2 flex-wrap">
                        <div className="flex">
                            {
                                movie.genres.map(genre=><p className="text-[#B91C1C] text-[10px] py-1 font-bold border-[1px] border-[#F8E7EB] rounded-full  px-2" key={genre.id}>{genre.name}</p>)
                            }    
                        </div>
                        <div className="right flex justify-center items-center gap-2 ">
                            <img src={Star} alt="rating" className="w-[20px] h-[20px]" />
                            <p className="text-[#E8E8E8] text-xs">{movie.vote_average.toFixed(1)}</p>
                            <p className="text-[#666666] text-sm font-bold pl-2 border-l-[2px] border-[#666666] ">{(movie.vote_count/1000).toFixed(2)}K</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="overview-section mt-4 gap-2 flex flex-col md:flex-row justify-between">
                <div className="left md:w-[60%] grow">
                    <p className="overview text-[#333333] px-2 max-w-[800px] md:pr-12" data-tesid="movie-overview" >{movie.overview}</p>
                    <p className="text-[14px] text-[#2d2525] font-[500] my-4 ">Directors: <span className=" text-[#BE123C]">{movie.directors.join(', ')}</span></p>
                    <p className="text-[14px] text-[#333333] font-[500] mb-4">Writers: <span className=" text-[#BE123C]">{movie.writers.join(', ')}</span></p>
                    <p className="text-[14px] text-[#333333] font-[500] ">Stars:  <span className=" text-[#BE123C]">{movie.sortedCast.join(', ')}</span></p>
                    <div className="rating mt-6 pr-10 lg:w-3/5">
                        <img src={MovieStats} alt=" rating statistics" className="h-16 w-auto" />    
                     </div>    
                </div>
                <div className="rigt flex flex-col gap-1 items-center md:items-end">
                    <div className="">
                        <img className="h-10 w-full max-w-12 pb-2 " src={Tickets} alt="tickets" />
                        <img className="h-10 w-full max-w-12 pb-2" src={MoreOptions} alt="more options"/>   
                    </div>
                     
                    <div className="recommended relative">
                           <div className="rec-images h-48 w-52 rounded-lg overflow-hidden flex gap-1">    
                             {movie.threeupcomingMovies.map(item=> <div className="h-full w-auto" key={item.upcomingID} onClick={navigateToMovie}><img className="h-full w-full object-cover" src={upcomingImageUrl+item.upcomingBackdrop} id={item.upcomingID} alt="recommended movie" /></div>)}

                            </div>    
                            <div className="shows  w-full h-8 absolute bottom-0 left-0 flex gap-1 items-center rounded-b-lg bg-[#12121280]">
                                <img src={List} alt="recommended shows" className="w-[20px] h-[20px]" />   
                                <p className=" tex-white text-[9px]">The Best Movies and Shows this month.</p>      
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
 
