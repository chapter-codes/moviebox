import MovieBox from './components/App'
import {MovieContextProvider} from './components/context/MovieContext'

function App() {
 
  return (
    <MovieContextProvider>
      <MovieBox />
    </ MovieContextProvider>
  )
}

export default App
