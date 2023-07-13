import { BsX, BsPlus, BsDash, BsTrash } from "react-icons/bs";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../Context/AuthProvider";
import { useCart, useCartActions } from "../../Context/CartProvider";

const CartList = () => {
    const { cart, total } = useCart();
    const dispatch = useCartActions();
    console.log(cart)
    const addCartHandler = (e, item) => {
        e.preventDefault();
        dispatch({ type: 'ADD_TO_CART', payLoad: item })
    }
    const removeCartHandler = (e, item) => {
        e.preventDefault();
        dispatch({ type: 'REMOVE_PRODUCT', payLoad: item })
    }
    const deleteProductHandler = (e, item) => {
        e.preventDefault();
        dispatch({ type: 'DELETE_PRODUCT', payLoad: item })
    }

    if (!cart.length)
        return (
            <div className="flex items-center justify-center">
                <p className="text-lg">Your cart is currently empty.</p>
            </div>
        );
    return (
        <>
            {
                cart.map((item, index) => (

                    <div className={`flex md:flex-row flex-col gap-4  border-slate-200 py-5 ${index !== 0 && 'border-t'}`} key={item.id}>
                        <Link to={`/product/${item.name}?id=${item.id}`} className="flex items-center basis-1/3">
                            <img src={item.image} className="w-24 h-24 mr-10 object-cover " />
                            <span className="text-base">{item.name}</span>
                        </Link>
                        <div className='flex items-center justify-between w-full'>
                            <span className='text-lg text-gray-300 mr-3 hidden md:inline-block'>Qty:</span>
                            <div className="flex items-center justify-between border border-slate-300 hover:border-slate-900 transition-all ease-linear duration-500 py-3 px-2">
                                <button onClick={(e) => removeCartHandler(e, item)}>
                                    {item.quantity === 1 ?
                                        <BsTrash className="w-8 h-8 text-red-500 hover:text-red-700 transition-all ease-linear duration-500 px-1" /> :
                                        <BsDash className="w-8 h-8 text-slate-300 hover:text-slate-900 transition-all ease-linear duration-500" />
                                    }
                                </button>
                                <input className='text-lg w-16 text-center outline-none !border-0' value={item.quantity} min="0" step="1" type="number" readOnly />
                                <button onClick={(e) => addCartHandler(e, item)}>
                                    <BsPlus className="w-8 h-8 text-slate-300 hover:text-slate-900 transition-all ease-linear duration-500" />
                                </button>
                            </div>
                            <div className='flex items-center justify-center basis-1/4 '>
                                <p>${item.offPrice * item.quantity} </p>
                            </div>
                            <div className='flex items-center justify-end basis-1/4'>
                                <button onClick={(e) => deleteProductHandler(e, item)}>
                                    <BsX className="w-5 h-5 text-gray-400" />
                                </button>
                            </div>
                        </div>

                    </div>
                ))
            }
            <CartTotals total={total} cart={cart} />
        </>
    );
}

export default CartList;

const CartTotals = ({ cart, total }) => {
    const userData = useAuth();
    const location = useLocation();
    const originalTotalPrice = cart.length ? cart.reduce((acc, curr) => acc + curr.quantity * curr.price, 0) : 0;
    return (
        <div className="border border-gray-200 md:p-10 p-4 my-9">
            <div className="flex items-start md:flex-row flex-col gap-4  w-full">
                <h4 className="text-xl basis-1/3">Cart totals</h4>
                <div className="flex flex-col w-full md:basis-1/3 gap-y-4">
                    <div className="flex items-center justify-between ">
                        <span className="">SUBTOTAL</span>
                        <span>${originalTotalPrice}</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="">DISCOUNT</span>
                        <span>${originalTotalPrice - total}</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="">TOTAL</span>
                        <span>${total}</span>
                    </div>
                    <Link to={userData ? '#checkout' : 'my-account?redirect=checkout#login'} className="mt-9 bg-slate-900 flex items-center justify-center text-white w-full mx-auto min-h-[80px]">
                        <span className="border-r border-stone-500 px-3 ">${total}</span>
                        <span className="px-3">Checkout</span>
                    </Link>
                </div>
            </div>
        </div>
    )
}