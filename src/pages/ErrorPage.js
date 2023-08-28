import { BsSearch } from "react-icons/bs";
import { useHeroActions } from "../Context/HeroProvider";
import { useEffect } from "react";

const ErrorPage = () => {
    const setHero = useHeroActions();
    useEffect(() => {
        setHero(false);
    }, [])
    return (
        <div className="flex mt-1 py-10 h-screen justify-center items-center bg-[url('/src/assets/img/shopheading.jpg')] bg-cover bg-center bg-no-repeat">
            <div className="w-10/12 pt-10 bg-slate-50 bg-opacity-50 text-center h-full relative">
                <h1 className="text-5xl mb-15">404</h1>
                <p className="text-xl">The page you are looking for not available!</p>
                <div className="bg-gray-200 md:px-20 px-8 py-10 absolute bottom-0 w-full flex md:flex-row flex-col">
                    <h3 className="text-3xl md:mr-20 mb-5 md:mb-0">Search</h3>
                    <div className="flex flex-row w-full">
                        <input type="text" name="name" placeholder='Enter Keywords' className='w-full' />
                        <button type="button" className="md:-ml-5">
                            <BsSearch className="w-5 h-5 text-gray-400" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ErrorPage;