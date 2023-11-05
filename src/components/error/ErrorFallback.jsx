// import {useMovieContext} from '../context/MovieContext'

export default function ErrorFallback({error, setError}) {
  console.log(error)
  function reset(){
      setError(false)
    }
    return (
      <div className='h-screen w-full flex flex-col items-center justify-center' role="alert">
        
        <p className="text-black py-4">Something went wrong:</p>
        <pre className="text-red-500 font-bold text-lg">{error.message}</pre>
        <button className="text-black text-xs border-2 p-4 px-12 m-4 hover:bg-red-500 hover:text-white rounded-2xl" onClick={reset}>Try again</button>
      </div>
    )
  }