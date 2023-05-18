import { toast } from "react-toastify";

const WishReducer = (state, action) => {
    //  console.log(state, action)
    switch (action.type) {
        case 'TOGGLE_TO_WISH':
            const updateWishList = [...state.wish];
            const updateIndexWishList = updateWishList.findIndex((item) => item._id === action.payLoad._id);
            if (updateIndexWishList < 0) {
                updateWishList.push(action.payLoad)
                toast.success(`${action.payLoad.name} add to WishList!`);
                return {
                    ...state,
                    wish: updateWishList
                }
            } else {
                const filterWishList = updateWishList.filter((item) => item._id !== action.payLoad._id);
                toast.warning(`${action.payLoad.name} remove to WishList!`);
                return {
                    ...state,
                    wish: filterWishList
                }
            }
        default:
            return state
    }

}

export default WishReducer;