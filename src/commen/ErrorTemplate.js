import React from "react";

const ErrorTemplate = (error) => {
    return (
        <div className='flex items-center justify-center py-10'>
            <p className='text-base '> {error}</p>
        </div>
    );
}

export default React.memo(ErrorTemplate);