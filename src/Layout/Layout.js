import React from 'react'
import Footer from '../component/Footer/Footer'
import Header from '../component/Header/Header'
import { Outlet } from 'react-router-dom'

function Layout() {
    return (
        <div className='pt-24'>
            <Header />
            <Outlet />
            <Footer />
        </div>
    )
}

export default Layout