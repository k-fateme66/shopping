import React from 'react'
import Footer from '../component/Footer/Footer'
import Header from '../component/Header/Header'

function Layout({ children }) {
    return (
        <div className='pt-24'>
            <Header />
            {children}
            <Footer />
        </div>
    )
}

export default Layout