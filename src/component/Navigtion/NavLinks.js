import React from 'react'
import { NavLink } from 'react-router-dom'

function NavLinks({ name, path }) {
    const navClassName = `font-semibold text-md text-slate-900 lg:line-hover p-4 lg:p-0 lg:border-0 block border-l-4 border-transparent `
    const activeClassName = ' active border-l-4 !border-slate-900 lg:border-0 ';
    return (
        <li key={name} className='relative inline-block'>
            <NavLink className={
                ({ isActive }) =>
                    isActive ? activeClassName + navClassName : navClassName
            }
                to={path}>{name}</NavLink>

        </li>
    )
}

export default NavLinks