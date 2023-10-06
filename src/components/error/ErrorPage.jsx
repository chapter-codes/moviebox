import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div className='flex flex-col justify-center items-center h-screen w-full'id="error-page">
      <h1 className="py-12 text-black text-[50px]">Oops!</h1>
      <p className="text-black text-lg pb-8">Inavlid Route </p>
      <p className="text-black text-lg py-8">
        {error.statusText || error.message}
      </p>
    </div>
  );
}