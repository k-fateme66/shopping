import React from 'react'

function Skeleton() {
    return (
        <div className='border border-gray-100 shadow-sm p-4 max-w-sm w-full mx-auto'>
            <div className="animate-pulse flex flex-col gap-3">
                <div className=" bg-slate-200 h-40 w-56 mx-auto"></div>
                <div className="h-4 w-56 mx-auto bg-slate-200"></div>
                <div className="h-2 w-56 mx-auto bg-slate-200"></div>
            </div>
        </div>
    )
}

export default Skeleton