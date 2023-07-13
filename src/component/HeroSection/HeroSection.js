import React from "react";
import Breadcrumb from "../Breadcrumb/Breadcrumb";

const HeroSection = ({ title, children }) => {
    return (
        <div className="bg-[url('/src/assets/img/home.jpg')] bg-cover bg-center bg-no-repeat text-center">
            <div className='md:py-56 py-24 w-full h-full backdrop-brightness-90 flex relative flex-col'>
                <h1 className='md:text-4xl text-2xl font-semibold text-white capitalize'>{title}</h1>
                <Breadcrumb style={'hero-breadcumbs'} />
                {children}
            </div>
        </div>
    );
}

export default React.memo(HeroSection);