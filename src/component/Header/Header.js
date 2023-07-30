import React from 'react';
import logo from '../../assets/img/logo.svg';
import ToolsHeader from './ToolsHearder';
import Offcanvas from '../Offcanvas/Offcanvas';
import Navigtion from '../Navigtion/Navigtion';
function Header() {
    return (
        <>
            <header className='py-9 lg:bg-white border-b border-gray-100 top-0 fixed w-full z-[1] bg-transparent lg:transition-all lg:duration-500 lg:ease-in-out  lg:hover:drop-shadow-md'>
                <div className='md:px-10 px-4 mx-auto flex items-center justify-between'>
                    <div className='flex-1'>
                        <Navigtion styleNav={'lg:block hidden'} styleUl={'flex gap-x-7'} />
                        <Offcanvas>
                            <Navigtion styleUl={'flex flex-col'} />
                        </Offcanvas>
                    </div>
                    <a href='/' className='shrink-0 w-32'>
                        <img src={logo} />
                    </a>
                    <ToolsHeader />
                </div>
            </header>
        </>
    )
}

export default React.memo(Header);