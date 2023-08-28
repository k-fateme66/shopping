import React, { useRef } from 'react';
import logo from '../../assets/img/logo.svg';
import ToolsHeader from './ToolsHearder';
import Offcanvas from '../Offcanvas/Offcanvas';
import Navigtion from '../Navigtion/Navigtion';
import { useEffect } from 'react';
import { useState } from 'react';
function Header() {
    const [sticky, setSticky] = useState('')
    const headerRef = useRef();

    useEffect(() => {
        window.addEventListener("scroll", isSticky);
        return () => {
            window.removeEventListener("scroll", isSticky);
        };
    }, []);

    const isSticky = () => {
        const scrollTop = window.scrollY;
        const stickyClass = scrollTop >= 1 ? "header-fixed" : "";
        setSticky(stickyClass);
    };

    return (
        <>
            <header className={`md:py-9 py-5 hover:bg-white top-0 fixed w-full z-[1] bg-transparent transition-all duration-500 ease-in-out ${sticky}`} ref={headerRef}>
                <div className='md:px-10 px-4 mx-auto flex items-center justify-between'>
                    <div className='flex-1'>
                        <Navigtion styleNav={'lg:block hidden'} styleUl={'flex gap-x-7'} />
                        <Offcanvas>
                            <Navigtion styleUl={'flex flex-col'} />
                        </Offcanvas>
                    </div>
                    <a href='/' className='shrink-0 w-32'>
                        <img src={logo} alt='sober' />
                    </a>
                    <ToolsHeader />
                </div>
            </header>
        </>
    )
}

export default React.memo(Header);