import React from "react";
import { NavLink, useLocation } from "react-router-dom";

const Breadcrumb = () => {
    const location = useLocation();
    let currentLink = '';
    console.log(location)
    const crumbs = location.pathname.split('/')

        .map((crumb) => {
            console.log(crumb)
            currentLink += `/${crumb}`
            if (crumb === '' && location.pathname !== '/') {
                return (
                    <div key='0' className="inline-block text-sm">
                        <NavLink to='/' >Home</NavLink>
                    </div>
                )
            }
            if (location.pathname !== '/') {
                return (
                    <div key={crumb} className="inline-block text-sm">
                        <NavLink to={currentLink} >{crumb}</NavLink>
                    </div>
                )
            }

        })
    return (
        <nav className="text-base text-gray-500 font-semibold breadcumbs">
            {crumbs}
        </nav>
    );
}

export default React.memo(Breadcrumb);