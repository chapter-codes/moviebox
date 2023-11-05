import MovieCard  from './standalone/MovieCard'
import ChevronRight from '../assets/Chevron right.svg'

export default function Movies({movies, showFeat=true}) {
   console.log(movies, showFeat)
  // setSearchResults? 
  return (
    <>

        <div className={`pt-8 px-8 flex justify-between items-center lg:px-8 ${showFeat?'':'hidden'}`}>
          <p className="text-sm text-black font-bold sm:text-[20px]">Featured Movie</p>
          <p className='text-xs  text-[#BE123C] '>See more <img className='inline-block px-2 w-[30px] h-[30px]' src={ChevronRight} alt="see more" /></p>
        </div>
        <div className="movies px-4 py-12 grid grid-cols-2 gap-4 md:grid-cols-3 md:px-12 lg:px-16 lg:grid-cols-4 md:gap-12 lg:gap-28 ">
            {
                movies.map(movie=>{
                    return <MovieCard movie={movie} key={movie.id}/> 
                })
            }
        </div>
    
    </>
  )
}


