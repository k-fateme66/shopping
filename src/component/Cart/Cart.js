import { useEffect, useState } from "react";
import { useCart } from "../../Context/CartProvider";
import CartList from "../CartList/CartList";
import { useWish } from "../../Context/WishProvider"
import WishList from "../WishList/WishList";
import { BsX } from "react-icons/bs";
const Cart = ({ tabActive, close }) => {
    const [openTab, setOpenTab] = useState(tabActive);
    const { cart, total } = useCart();
    const { wish } = useWish()
    const changeTabHandler = (e, tabNum) => {
        e.preventDefault();
        setOpenTab(tabNum);
    }
    return (
        <>
            <div className="p-10 relative">
                <h4 className="text-[32px]">Cart</h4>
                <button className="top-10 right-9 absolute z-10" onClick={close}>
                    <BsX className="w-10 h-10" />
                </button>
            </div>
            <div className="flex flex-col items-center justify-center w-full pt">
                <ul className="flex space-x-2">
                    <li>
                        <a
                            href="#"
                            onClick={(e) => changeTabHandler(e, 1)}
                            className="inline-block px-4 py-2"
                        >
                            <div className={`${openTab === 1 ? "active" : ""} line-hover tab-nav flex items-center justify-center w-full mb-8 relative`}>
                                <h4 className="md:text-xl text-lg  mr-2 font-semibold py-2">Shopping Cart</h4>
                                <span className="count bg-slate-900 w-5 h-5 flex justify-center items-center text-sm font-semibold rounded-full text-white">{cart.length}</span>
                            </div>
                        </a>
                    </li>
                    <li>
                        <a
                            href="#"
                            onClick={(e) => changeTabHandler(e, 2)}
                            className="inline-block px-4 py-2"
                        >
                            <div className={`${openTab === 2 ? "active" : ""} line-hover tab-nav flex items-center justify-center w-full mb-8 relative`}>
                                <h4 className="md:text-xl text-lg mr-2 font-semibold py-2">wishlist</h4>
                                <span className="count bg-slate-900 w-5 h-5 flex justify-center items-center text-sm font-semibold rounded-full text-white">{wish.length}</span>
                            </div>
                        </a>
                    </li>
                </ul>
                <div className="w-full md:w-4/5 relative ">
                    <div className={`${openTab === 1 ? "active" : ""} tab-panel`}>
                        <CartList />
                    </div>
                    <div className={`${openTab === 2 ? "active" : ""} tab-panel`}>
                        <WishList />
                    </div>
                </div>
            </div>


        </>
    );
}

export default Cart;