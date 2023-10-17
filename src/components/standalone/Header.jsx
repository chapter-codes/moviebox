import Logo from '../../assets/tv.svg'
import SearchIcon from '../../assets/Search.svg'
import MenuIcon from '../../assets/Menu.svg'
import {Link} from 'react-router-dom'
import {useMovieContext} from '../context/MovieContext'


export default function Header() {
    const {searchText, setSearchText, setState, screenSize} = useMovieContext()

    const handleEvent=(event)=>{
      const {value:text} =event.target
      console.log(text)
      text != ''? setState('searchFocused') :setState('resolved')
      setSearchText(text)
    }
    return (
      <>
            <div className={`py-4 px-4 header w-full flex justify-evenly items-center gap-3 relative z-10`}>
              <div className="logo-wrapper flex gap-4 items-center">
                  <img className='h-[30px] w-[30px] ' src={Logo} alt="logo" />
                  {screenSize!="Mobile" && <p>MovieBox</p> }
              </div>
              <div className="search h-6  pr-[10px] flex justify-between items-center grow rounded border-[1px] border-gray-300 max-w-md ">
                  <input className='pl-[5px] text-[10px] placeholder:text-[#fff] h-full w-11/12 text-white bg-transparent outline-none' 
                      type="search"
                      name="search-movie" 
                      id="search-movie"
                      placeholder='What do you want to watch?' 
                        onChange={handleEvent}
                        value={searchText}
                   />
                  <img className='w-[12px] h-[12px]' src={SearchIcon} alt="search icon" />
              </div>
              <div className={`menu flex justify-between items-center gap-2`}>
                  <Link className={screenSize=='Mobile'?'text-xs':'text-lg'} to="/sign-in"  disabled={true}>Sign in</Link>
                  
                  <img className ='w-[25px] h-[25px] ' src={MenuIcon} alt="menu icon6" onClick={toggleBar} />               
              </div>
          </div>
  
      </>
    )
  }



  
function HandleMovieSearch(event){
    console.log(event)
}

function toggleBar(event){
    console.log(event)
}
