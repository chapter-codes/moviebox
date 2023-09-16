import Logo from '../../assets/tv.svg'
import SearchIcon from '../../assets/search.svg'
import MenuIcon from '../../assets/Menu.svg'


export default function Header({ searchText, setSearchText }) {
    // console.log(setSearchText)
    return (
      <>
            <div className=" py-4 px-8 header w-full flex justify-evenly items-center gap-3 relative z-10">
              <div className="logo-wrapper flex gap-4 items-center">
                  <img className='h-[30px] w-[30px] ' src={Logo} alt="logo" />
                  <p>MovieBox</p>
              </div>
              <div className="search h-6  pr-[10px] flex justify-between items-center grow rounded border-[1px] border-gray-300 max-w-md ">
                  <input className='pl-[5px] text-[10px] placeholder:text-[#fff] h-full w-11/12 text-white bg-transparent outline-none' 
                      type="search"
                      name="search-movie" 
                      id="search-movie"
                      placeholder='What do you want to watch?' 
                        onChange={(event) => setSearchText(event.target.value)}
                        value={searchText}
                   />
                  <img className='w-[12px] h-[12px]' src={SearchIcon} alt="search icon" />
              </div>
              <div className="menu flex justify-between items-center gap-2">
                  <a className=' ' href="/sign">Sign in</a>
                  
                  <img className ='w-[30px] h-[30px] ' src={MenuIcon} alt="menu icon" onClick={toggleBar} />               
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