import MovieCard  from './standalone/MovieCard'
import ChevronRight from '../assets/Chevron right.svg'

export default function Movies({movies, setSearchResults}) {
   console.log(movies)
  // setSearchResults? 
  return (
    <>

        <div className='pt-8 px-12 flex justify-between  '>
          <p className="text-2xl text-black font-bold sm:text-[20px]">Featured Movie</p>
          <p className='text-xs  text-[#BE123C] '>See more <img className='inline-block px-2 w-[30px] h-[30px]' src={ChevronRight} alt="see more" /></p>
        </div>
        <div className="movies px-12 py-12 grid grid-cols-2 gap-4 sm:grid-cols-4 md:gap-12 lg:gap-16">
            {
                movies.map(movie=>{
                    return <MovieCard movie={movie} key={movie.id}/> 
                })
            }
        </div>
    
    </>
  )
}


