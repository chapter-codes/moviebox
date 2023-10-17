
import Header from './standalone/Header'
import Imdb from '../assets/imdb.svg'
import Tomato from '../assets/tomato.svg'
import WatchTrailer from '../assets/watch-trailer.svg'
import {useMovieContext} from './context/MovieContext'






export default function Poster({ poster }) {
    const {screenSize} =useMovieContext() 
    const{posterClass, titleClass}= styles(screenSize)
    
    const {backdrop_path, vote_average, original_title, overview}=poster
    const imageBaseUrl= screenSize=='Mobile'?
      'https://image.tmdb.org/t/p/original'  
    :'https://image.tmdb.org/t/p/original'

  return (<>
    <div style={{backgroundImage:`url(${imageBaseUrl+backdrop_path})`}}className={posterClass} >
 
    <Header />
    <div className="poster-card py-12 px-12 relative z-10 md:w-3/5 lg:w-2/5">
        <p className={titleClass}>{original_title}</p>
        <div className="rating flex gap-2">
            <div className="imdb flex">
                <img className=' w-9 h-4' src={Imdb} alt="imdb logo" />
                <p className="text-xs">{(vote_average*10).toFixed(1)} / 100</p>
            </div>
            <div className="rotten-tomatoes flex gap-2">
            <   img className=' w-4 h-4' src={Tomato} alt="tomato logo" />
                <p className="text-xs">{vote_average*10}%</p>
            </div>
        </div>
        <p className="overview text-sm py-8 ">{overview}</p>
        <img className='w-40 h-9' src={WatchTrailer} alt="watch trailer" />


    </div>
        
      

    </div>
  </>

  )
}



function styles(size){
    let posterClass=`poster  w-full  bg-gray-500 relative bg-center bg-no-repeat bg-cover`, titleClass=`poster-title text-3xl  my-3`,
        overviewStyle;

    if(size=="Mobile"){
    
    }   
    else if(size=='Tablet'){
        titleClass=`poster-title text-5xl my-4`

    }
    else{
         
    }
    return {posterClass, overviewStyle, titleClass}
}