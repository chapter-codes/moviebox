import { useRouteError, useNavigate } from "react-router-dom";
import {useState, useEffect} from 'react'




export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);
  const [errorState, setErrorState] = useState(false)
  const navigate= useNavigate()

  
  useEffect(() => {
    errorState ? navigate('/') : null
    
  }, [errorState])

  return (
    <div className='h-screen w-full flex flex-col items-center justify-center' role="alert">
      
      <p className="text-black py-4">Oops! Something went wrong:</p>

      <pre className="text-red-500 font-bold text-lg" >ERROR {error.status}: {error.error.message}</pre>
      <button className="text-black text-xs border-2 p-4 px-12 m-4 hover:bg-red-500 hover:text-white rounded-2xl" onClick={()=>setErrorState(true)}>Go Home</button>
    </div>
  );
}

