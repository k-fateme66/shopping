import ProgressiveImg from "../../commen/ProgressiveImg";
import { CreateFormatDate } from "../../utils/CreateFormatDate";
import placeholderSrc from '../../assets/img/placeholder.jpg'

import React from "react";
function Items({ currentItems }) {
    return (
        <>
            {currentItems &&
                currentItems.map((post) => (
                    <div key={post.id} className='w-100 overflow-hidden border-b border-slate-200 py-8'>
                        <div className='flex flex-col md:flex-row justify-between items-center gap-x-10'>
                            <div className='basis-1/2'>
                                <a href={`blog/${post.title.split(' ').join('-')}?id=${post.id}`} className='block mb-6 md:mb-0'>
                                    <ProgressiveImg src={post.image} placeholderSrc={placeholderSrc} alt={post.title} className='w-full' />
                                </a>
                            </div>
                            <div className='basis-1/2 overflow-hidden'>
                                <div className='flex items-center mb-3'>
                                    <a className='text-sm font-semibold mr-5' href={`blog/${post.title.split(' ').join('-')}?id=${post.id}`}>
                                        {CreateFormatDate(post.creatAt)}
                                    </a>
                                    <a className='text-sm font-semibold uppercase' href={`/blog/${post.category}`}>{post.category}</a>
                                </div>
                                <a href={`/blog/${post.title.split(' ').join('-')}?id=${post.id}`}>
                                    <h3 className='text-lg  font-semibold mb-3'>{post.title}</h3>
                                </a>
                                <p className='mb-3 text-gray-500 text-sm overflow-hidden md:truncate w-full'>{post.body}</p>
                                <span className='relative inline-block'>
                                    <a href={`/blog/${post.title.split(' ').join('-')}?id=${post.id}`} className="text-sm font-semibold line-hover py-1 block before:content-[' '] before:absolute before:bg-slate-400 before:w-full before:bottom-0 before:h-[2px]">Read More</a>
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
        </>
    );
}

export default React.memo(Items);