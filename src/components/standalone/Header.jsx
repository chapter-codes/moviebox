import Logo from '../../assets/tv.svg'
import SearchIcon from '../../assets/Search.svg'
import MenuIcon from '../../assets/Menu.svg'
import {Link} from 'react-router-dom'
import {useMovieContext} from '../context/MovieContext'
import {useRef, useState, useEffect} from 'react'

export default function Header() {
    const {searchText, setSearchText, setState} = useMovieContext()
    const headerRef=useRef()
    const [whiteBg, setWhiteBg]= useState(false)


    useEffect(()=>{
      window.onscroll=(event)=>{
        if(window.scrollY>=40){
          setWhiteBg(true)
        }else{
          setWhiteBg(false)
        }
      }
    }, [whiteBg])


    const handleEvent=(event)=>{
      const {value:text} =event.target
      console.log(text)
      text != ''? setState('searchFocused') :setState('resolved')
      setSearchText(text)
    }
    return ( 
      <>
            <div className={`pt-6 pb-4 px-4  header h-10 w-full flex justify-between items-center gap-3 fixed left-0   z-20  ${whiteBg?'bg-white border-b-[1px] border-[[#be123c] opacity-1':''}`} ref={headerRef}> 
              <div className="logo-wrapper flex gap-4 items-center">
                  <img className='h-[30px] w-[30px] ' src={Logo} alt="logo" />
                   <p className={`hidden md:block ${searchText||whiteBg?'text-[#BE123C]':'text-[#fff]'}`}>MovieBox</p> 
                  
              </div>
              <div className="search h-6 max-w-lg pr-[10px] flex justify-between items-center grow rounded border-[1px] border-gray-300  ">
                  <input className={`pl-[5px] text-[10px] placeholder:${searchText?'text-[#BE123C]':'text-[#fff]'} h-full w-11/12 ${searchText?'text-[#BE123C]':'text-[#fff]'} ${whiteBg?'placeholder:text-[#BE123C]':''} bg-transparent outline-none`} 
                      type="search"
                      name="search-movie" 
                      id="search-movie"
                      placeholder='What do you want to watch?' 
                        onChange={handleEvent}
                        value={searchText}
                   />
                  {/* <img className='w-[12px] h-[12px] bg-red-200 t' src={SearchIcon} alt="search icon" /> */}
                  <svg width="16" height="16" viewBox="0 0 16 16" fill='none' xmlns="http://www.w3.org/2000/svg">
                    <path d="M14 14L10 10M11.3333 6.66667C11.3333 9.244 9.244 11.3333 6.66667 11.3333C4.08934 11.3333 2 9.244 2 6.66667C2 4.08934 4.08934 2 6.66667 2C9.244 2 11.3333 4.08934 11.3333 6.66667Z" stroke={whiteBg?'#be123c':'white'} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>

              </div>
              <div className={`menu flex justify-between items-center gap-2`}>
                  <Link className={`text-xs hidden md:block ${searchText||whiteBg?'text-[#BE123C]':'text-[#fff]'}`} to="/sign-in"  disabled={true}>Sign in</Link>
                  
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
