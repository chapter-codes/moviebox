import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'


import Imdb from '../../assets/imdb.svg'
import Tomato from '../../assets/tomato.svg'
import {tmdbGenres} from  '../standalone/tmdbGenres'





export default function MovieCard({ movie }) {
  const {release_date, genre_ids, poster_path, original_title, vote_average, id}=movie
  const date= new Date(release_date)
  const releaseUTCYear= date.getUTCFullYear()
  const imageUrl = 'https://image.tmdb.org/t/p/w300'
  const genres=tmdbGenres()
  const movieGenres = genres.filter(tmdbGenre => genre_ids.includes(tmdbGenre.id)).map(item=>item.name)
  const navigateTo = useNavigate();
  
  const [navMovieId, setnavMovieId] = useState(null)
    
  function navigateToMovie(event) {
      console.log(event.target.id);
      setnavMovieId(event.target.id)
    }
  
  useEffect(() => {
      navMovieId ? navigateTo("/movies/" + navMovieId) : null
    }, [navMovieId])


  return (
   <div data-testid='movie-card  max-w-vw'>
      <img src={imageUrl + poster_path} alt="" data-testid='movie-poster' onClick={navigateToMovie} id={id} />
        <p className="release_date text-xs text-[#9CA3AF] pt-4 pb-2"  data-testid='movie-release-date'> USA, {releaseUTCYear}</p> 
        <p className="title text-xs text-[#111827] font-[700] py-2 lg:text-base" data-testid='movie-title'>{original_title}</p>
        <div className="rating py-3 pr-2 flex justify-between gap-2">
                <div className="imdb flex">
                    <img className=' w-6 h-4 pr-3' src={Imdb} alt="imdb logo" />
                    <p className="text-[.625rem] text-[#111827]">{(vote_average*10).toFixed(1)} / 100</p>
                </div>
                <div className="rotten-tomatoes flex gap-2">
                <   img className='w-2 h-2 md:w-4 md:h-4' src={Tomato} alt="tomato logo" />
                    <p className="text-[.625rem] text-[#111827]">{(vote_average*10).toFixed(0)}%</p>
                </div>
          </div>
          <div className="genres flex flex-wrap ">
            {
                movieGenres.map(genre=> <p className="genre-ids  text-[#9CA3AF] text-[0.625rem] pl-1 md:text-[.6875rem] lg:text-xs" key={genre}>{genre}</p>)
            
            }        
          </div>

    
   </div>

  )
}

