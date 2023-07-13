
import paginatedItemsHOC from "../HOC/PaginatedItemsHoc";

const BlogList = ({ itemsPerPage, items }) => {

    return (
        <div>
            <p> bloglist</p>
        </div>
    );
}

export default paginatedItemsHOC(BlogList, 5);