import Logo from '../assets/tv.svg'

export default function Loading() {
  return (
   <div className="flex justify-center items-center h-screen">
    <img className='w-[30px] h-[3opx]' src={Logo} alt="logo" />
   <p className="text-black text-md p-4 font-bold">Loading...</p>
   </div>
  )
}
