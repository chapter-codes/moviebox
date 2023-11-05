import Logo from '../../assets/tv.svg'

export default function Loading() {
  return (
   <div className="flex flex-col justify-center items-center h-screen">
    <div className=" flex justify-center items-center" >
      <img className='w-[30px] h-[3opx]' src={Logo} alt="logo" />
      <p className="text-black text-md p-4 font-bold">Loading...</p>
    </div>
    <p className="text-[#333] text-xs font-bold">This app is still under construction. Apply safety and caution 😀</p>
   </div>
  )
}
