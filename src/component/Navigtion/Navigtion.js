import React from 'react'
import NavLinks from './NavLinks'
function Navigtion({ styleNav, styleUl }) {
    const navLinks = [
        { path: '/', name: 'HomePage' },
        { path: 'shop', name: 'Shop' },
        { path: 'contactus', name: 'Contact Us' }
    ]


    return (
        <nav className={styleNav}>
            <ul className={styleUl}>
                {
                    navLinks.map((link) => {
                        return (
                            <NavLinks key={link.path} path={link.path} name={link.name} />
                        )
                    })
                }
            </ul>
        </nav>
    )
}

export default Navigtion