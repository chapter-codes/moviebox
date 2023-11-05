import Header from './standalone/Header'
import Imdb from '../assets/imdb.svg'
import Tomato from '../assets/tomato.svg'
import WatchTrailer from '../assets/watch-trailer.svg'
import {useMovieContext} from './context/MovieContext'
import {useNavigate} from 'react-router-dom'


export default function Poster({ poster }) {
 
    const {backdrop_path, vote_average, original_title, overview, id}=useMovieContext().poster
    const imageBaseUrl='https://image.tmdb.org/t/p/original'
    const navigate=useNavigate()
   
  return (<>
    <div className={`poster  w-full pt-12 pb-6 bg-gray-500 relative bg-center bg-no-repeat bg-cover lg:h-[450px]`} style={{backgroundImage:`url(${imageBaseUrl+backdrop_path})`}} >
            <div className="poster-card px-6  md:px-12 relative z-10   sm:w-3/5 ">
                <p className={`poster-title text-2xl  font-bold m py-8 md:text-2xl lg:text-3xl`} onClick={()=>{navigate('/movies/'+id)}}>{original_title}</p>
                <div className="rating flex gap-4">
                    <div className="imdb flex">
                        <img className=' w-9 h-4' src={Imdb} alt="imdb logo" />
                        <p className="text-xs pl-1">{(vote_average*10).toFixed(1)} / 100</p>
                    </div>
                    <div className="rotten-tomatoes flex gap-2">
                    <   img className=' w-4 h-4' src={Tomato} alt="tomato logo" />
                        <p className="text-xs">{(vote_average*10).toFixed(0)}%</p>
                    </div>
                </div>
                <p className="overview text-xs pr-8 sm:max-w-full md:text-sm lg:max-w-lg py-8 ">{overview}</p>
                <img className='w-40 h-9' src={WatchTrailer} alt="watch trailer" />
            </div>
    </div>
  </>

  )
}

         
    
