import React from "react";
import Breadcrumb from "../Breadcrumb/Breadcrumb";

const HeroSection = ({ title, children, styleBreadcrumb, styleTitle }) => {

    return (
        <div className="bg-[url('/src/assets/img/home.jpg')] bg-cover bg-center bg-no-repeat text-center h-screen">
            <div className='justify-center w-full h-full backdrop-brightness-95 flex relative flex-col'>
                <h1 className={`md:text-5xl text-2xl capitalize ${styleTitle}`}>{title}</h1>
                <Breadcrumb style={styleBreadcrumb} />
                {children}
            </div>
        </div>
    );
}

export default React.memo(HeroSection);