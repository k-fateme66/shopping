import ReactPaginate from 'react-paginate';
import { useState } from 'react';
import Items from './Items';
import { BsArrowLeft, BsArrowRight, BsThreeDots } from 'react-icons/bs';
import React from "react";

function PaginatedItems({ itemsPerPage, items }) {
    // Here we use item offsets; we could also use page offsets
    // following the API or data you're working with.
    const [itemOffset, setItemOffset] = useState(0);

    // Simulate fetching items from another resources.
    // (This could be items from props; or items loaded in a local state
    // from an API endpoint with useEffect and useState)
    const endOffset = itemOffset + itemsPerPage;
    //console.log(`Loading items from ${itemOffset} to ${endOffset}`, items);
    const currentItems = items.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(items.length / itemsPerPage);

    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % items.length;
        // console.log(
        //     `User requested page number ${event.selected}, which is offset ${newOffset}`
        // );
        setItemOffset(newOffset);
    };
    return (
        <>
            <Items currentItems={currentItems} />
            <ReactPaginate
                breakLabel={<BsThreeDots className='h-4 w-4 text-slate-400' />}
                nextLabel={<BsArrowRight className='h-4 w-4' />}
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={pageCount}
                previousLabel={<BsArrowLeft className='h-4 w-4' />}
                renderOnZeroPageCount={null}
                containerClassName='flex items-center border-b-2 border-slate-200 max-w-max'
                disabledClassName='hidden'
                previousClassName='previous mr-2'
                pageClassName='mr-2'
                pageLinkClassName='py-4 px-2 block  text-slate-400'
                activeLinkClassName='!text-slate-900'
                activeClassName="relative after::content-[' '] after:absolute after:bg-slate-900 after:right-0 after:w-full after:-bottom-[0.5px] after:h-[2px]"
            />
        </>
    );
}

export default React.memo(PaginatedItems);