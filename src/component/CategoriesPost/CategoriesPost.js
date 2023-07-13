import { NavLink } from "react-router-dom";
import { usePosts } from "../../Context/PostsProvider";
import React from "react";

const CategoriesPost = () => {
    const { categories } = usePosts();
    const navClassName = `font-semibold text-white capitalize text-md md:line-hover md:line-hover-white  py-3  md:border-0 block border-l-4 border-transparent `;
    const activeClassName = ' active border-l-4 !border-white md:border-0 ';
    return (
        <ul className='flex flex-row  justify-center'>
            <li className='relative inline-block mx-5'>
                <NavLink end to='' className=
                    {
                        ({ isActive }) =>
                            isActive ? activeClassName + navClassName : navClassName
                    }>All Blog Posts</NavLink>
            </li>
            {
                categories.data.map((category, index) => {
                    return <li className='relative inline-block mx-5' key={index}>
                        <NavLink to={`/blog/category/${category.title.toLowerCase()}`} className={
                            ({ isActive }) =>
                                isActive ? activeClassName + navClassName : navClassName
                        }>{category.title}</NavLink>
                    </li>
                })
            }
        </ul>
    );
}

export default React.memo(CategoriesPost);