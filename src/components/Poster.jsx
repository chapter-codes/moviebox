
import Header from './standalone/Header'
import Imdb from '../assets/imdb.svg'
import Tomato from '../assets/tomato.svg'
import WatchTrailer from '../assets/watch-trailer.svg'






export default function Poster({ poster, searchText, setSearchText }) {
    // console.log('poster', setSearchText);
    
    const {backdrop_path, vote_average, original_title, overview}=poster
    const imageBaseUrl='https://image.tmdb.org/t/p/original'

  return (<>
    <div className={`poster  w-full  bg-gray-500  bg-[url('${'https://image.tmdb.org/t/p/original'+ backdrop_path}')] relative`}>
    <img 
        className='absolute  w-full max-h-[600px]  top-0 left-0 h-full object-cover'
    src={imageBaseUrl+ backdrop_path } alt="poster"  />


    <Header searchText={searchText} setSearchText={setSearchText} />
    <div className="poster-card py-12 px-12 relative z-10 md:w-3/5 lg:w-2/5">
        <p className="poster-title text-5xl my-4">{original_title}</p>
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

