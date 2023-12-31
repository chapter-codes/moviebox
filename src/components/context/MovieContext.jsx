import {createContext, useContext, useState } from 'react'
import {useMedia} from '../utils/useMedia'


const MovieContext= createContext({
	state:'loading',
	error:false,
	movies:'',
	poster:'',
	searchText:''
})

const MovieContextProvider=({children})=>{
	const [state, setState]=useState('loading')
    const [poster, setPoster]=useState('')
    const [movies, setMovies]    =useState('')
    const [error, setError]    =useState(false)
    const [searchText, setSearchText] = useState('')
    const [search, setSearch] = useState('')
    const screenSize=useMedia()



	return (
		<MovieContext.Provider value={{state, setState, poster, setPoster, movies, setMovies, error, setError, searchText, setSearchText, search, setSearch, screenSize}}  >
		{children}
		</MovieContext.Provider>
		)

}


const useMovieContext=()=>{
	if(!MovieContext){
		setError({message:'use movie context within MovieContext Provider'})
		return
	}
	return useContext(MovieContext)
}

export {MovieContextProvider, useMovieContext}