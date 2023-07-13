import React from "react";
import { NavLink, useLocation } from "react-router-dom";

const Breadcrumb = ({ style }) => {
    const location = useLocation();
    let currentLink = '';
    const crumbs = location.pathname.split('/')
        .map((crumb, index) => {
            if (crumb === '' && location.pathname !== '/') {
                currentLink += `/${crumb}`
                return (
                    <div key='0' className="inline-block text-sm">
                        <NavLink to='/' >Home</NavLink>
                    </div>
                )
            }
            if (location.pathname !== '/') {
                index > 1 ? currentLink += `/${crumb}` : currentLink += `${crumb}`
                return (
                    <div key={crumb} className="inline-block text-sm ">
                        <NavLink to={currentLink} >{crumb}</NavLink>
                    </div>
                )
            }

        })
    return (
        <nav className={`text-base text-gray-400 font-semibold breadcumbs ${style}`}>
            {crumbs}
        </nav>
    );
}

export default React.memo(Breadcrumb);