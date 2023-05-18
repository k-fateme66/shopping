import { useWish, useWishActions } from "../../Context/WishProvider";
import { BsX } from "react-icons/bs";
import { useCartActions } from "../../Context/CartProvider";
import { Link } from "react-router-dom";

const WishList = () => {
    const { wish } = useWish();
    const wishDispatch = useWishActions();
    const cartDispatch = useCartActions();
    const deleteProductHandler = (e, product) => {
        e.preventDefault();
        wishDispatch({ type: 'TOGGLE_TO_WISH', payLoad: product });
    }
    const addCartHandler = (e, product) => {
        e.preventDefault();
        cartDispatch({ type: 'ADD_TO_CART', payLoad: product })
    }


    if (!wish.length) {
        return (
            <div className="flex items-center justify-center">
                <p className="text-lg">Your wishlist is currently empty.</p>
            </div>
        )
    };
    return (
        <>
            {
                wish.map((item) => (
                    <div className="flex justify-between border-t border-slate-200 py-5" key={item._id}>
                        <Link to={`/product/${item.name}?id=${item._id}`} className="flex items-center md:basis-1/3">
                            <button onClick={(e) => deleteProductHandler(e, item)}>
                                <BsX className="w-5 h-5 text-gray-400" />
                            </button>
                            <img src={item.image} className="w-24 h-24 object-cover mr-10 ml-3" />
                            <div>
                                <span className="text-lg font-semibold">{item.name}</span>
                                <p className="md:hidden">${item.offPrice} </p>
                                <button onClick={(e) => addCartHandler(e, item)} className="md:hidden font-semibold">
                                    Add to cart
                                </button>
                            </div>
                        </Link>
                        <div className='md:flex hidden items-center justify-center basis-1/4'>
                            <p>${item.offPrice} </p>
                        </div>
                        <div className='md:flex hidden items-center justify-end basis-1/4'>
                            <button onClick={(e) => addCartHandler(e, item)} className="bg-slate-900 text-white px-4 py-3">
                                Add to cart
                            </button>
                        </div>
                    </div>
                ))
            }
        </>
    );
}

export default WishList;