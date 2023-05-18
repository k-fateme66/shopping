import React from "react";

const Loading = () => {
    return (
        <div className='flex items-center justify-center py-10'>
            <div className="animate-ping rounded-full bg-slate-900 w-8 h-8"></div>
        </div>
    );
}

export default React.memo(Loading);