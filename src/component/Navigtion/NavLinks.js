import React from 'react'
import { NavLink } from 'react-router-dom'

function NavLinks({ name, path }) {
    const navClassName = `font-semibold text-slate-900 md:line-hover p-4 md:p-0 md:border-0 block border-l-4 border-transparent `
    const activeClassName = ' active border-l-4 !border-slate-900 md:border-0 ';
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