import { useEffect } from "react";
import { a, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import Breadcrumbs from '../component/Breadcrumb/Breadcrumb'
import { BsHeartFill, BsArrowRight, BsArrowLeft, BsSlash, BsCurrencyDollar, BsHeart, BsTrash, BsDash, BsPlus, BsCart2, BsInstagram, BsWhatsapp, BsTelegram, BsFacebook, BsTwitter } from "react-icons/bs";
import { useProducts } from "../Context/ProductsProvider";
import { useCart, useCartActions } from "../Context/CartProvider";
import { checkInCart } from "../utils/CheckInCart";
import ErrorTemplate from "../commen/ErrorTemplate";
import Loading from "../commen/Loading";
import { useWish, useWishActions } from "../Context/WishProvider";

const ProductDetails = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const _id = searchParams.get('id')
    const { product, setPath } = useProducts();
    const { cart } = useCart();
    const { wish } = useWish();
    const cartDispatch = useCartActions();
    const dispatchWish = useWishActions();
    const checkWishList = checkInCart(wish, _id);
    useEffect(() => {
        setPath(_id);
    }, [])

    const addCartHandler = (e, item) => {
        e.preventDefault();
        cartDispatch({ type: 'ADD_TO_CART', payLoad: item })
    }

    const removeCartHandler = (e, item) => {
        e.preventDefault();
        cartDispatch({ type: 'REMOVE_PRODUCT', payLoad: item })
    }

    const AddWishHandler = (e, item) => {
        e.preventDefault();
        dispatchWish({ type: 'TOGGLE_TO_WISH', payLoad: item })
    }

    const ProductDetailsTemplate = (_product) => {
        const productInCart = checkInCart(cart, _product._id);
        const product = cart.length && productInCart ? productInCart : _product;
        return (
            <>
                <div className="flex items-center justify-between py-5">
                    <Breadcrumbs />
                    <div className='flex items-center justify-between '>
                        <a href='#' className=' text-gray-500 mr-2 cursor-pointer'>
                            <BsArrowLeft className='h-4 w-4' />
                        </a>
                        <a href='#' className=' text-gray-500 cursor-pointer'>
                            <BsArrowRight className='h-4 w-4' />
                        </a>
                    </div>
                </div>
                <div className='flex md:flex-row flex-col item-start justify-between'>
                    <div className='md:w-1/2 md:order-2 order-1 md:px-7 py-6' >
                        <h1 className='text-center text-3xl font-bold mb-8'>{product.name}</h1>
                        <div className='flex justify-center items-end mb-10'>
                            {
                                product.description && product.description.length && product.description.map((item, index, { length }) =>
                                    <div className='flex justify-start items-center' key={item._id}>
                                        <span className='text-sm font-semibold text-gray-500'>{item.support}</span>
                                        {(index !== length - 1) ? <BsSlash className='w-3 h-3 text-gray-500' /> : ''}
                                    </div>
                                )
                            }
                        </div>
                        <div className='flex justify-center items-end mb-10'>
                            <div className="flex items-center justify-center">
                                <BsCurrencyDollar className='w-6 h-6' />
                                <h3 className="text-2xl -m-1 leading-6">{product.offPrice !== '' ? product.offPrice : product.price}</h3>
                            </div>
                            {product.offPrice !== '' &&
                                <div className="flex items-center justify-center ml-3">
                                    <BsCurrencyDollar className='w-4 h-4 text-gray-400 ' />
                                    <span className=" text-gray-400 line-through leading-6">{product.price}</span>
                                </div>
                            }
                        </div>
                        <div className="flex items-center justify-center mb-10">
                            {product.quantity ?
                                <div className="flex items-center justify-between border border-slate-300 hover:border-slate-900 transition-all ease-linear duration-500 py-2 px-2 mx-3">
                                    <button onClick={(e) => removeCartHandler(e, product)}>
                                        {product.quantity === 1 ?
                                            <BsTrash className="w-8 h-8 text-red-500 hover:text-red-700 transition-all ease-linear duration-500 px-1" /> :
                                            <BsDash className="w-8 h-8 text-slate-300 hover:text-slate-900 transition-all ease-linear duration-500" />
                                        }
                                    </button>
                                    <input className='text-lg w-16 text-center outline-none !border-0' value={product.quantity} min="0" step="1" type="number" readOnly />
                                    <button onClick={(e) => addCartHandler(e, product)}>
                                        <BsPlus className="w-8 h-8 text-slate-300 hover:text-slate-900 transition-all ease-linear duration-500" />
                                    </button>
                                </div>
                                :
                                <button onClick={(e) => addCartHandler(e, product)} className="grow-0 bg-slate-800 flex items-center justify-center text-white  mx-3 px-8 py-[19px] font-semibold hover:bg-slate-900 ">
                                    <BsCart2 className="w-5 h-5 text-white mr-3 " />
                                    Add to cart
                                </button>
                            }
                            <button onClick={(e) => AddWishHandler(e, product)} type="button" className="border-slate-300 border p-5 group hover:border-slate-800 transition-all duration-300  ease-in-out">
                                {/* <BsHeart className="w-5 h-5 text-gray-500 group-hover:text-slate-800" /> */}
                                {(wish.length && checkWishList) ?
                                    <BsHeartFill className="w-5 h-5  text-gray-900 group-hover:text-slate-800" /> : <BsHeart className="w-5 h-5 text-gray-500 group-hover:text-slate-800" />
                                }
                            </button>
                        </div>
                        <div className="flex justify-center items-center border-t border-b py-10 border-b-gray-300 border-t-gray-300">
                            <ul className="flex items-center leading-none">
                                <li>
                                    <a href={`https://www.twitter.com/intent/tweet?url=${window.location.href}`} className="block text-sm mx-4 text-slate-500 hover:text-slate-900 ">
                                        <BsTwitter className="w-4 h-4" />
                                    </a>
                                </li>
                                <li>
                                    <a href={`https://wa.me/?text=${window.location.href}`} className="block text-sm mx-4 text-slate-500 hover:text-slate-900 ">
                                        <BsWhatsapp className="w-4 h-4" />
                                    </a>
                                </li>
                                <li>
                                    <a href={`https://t.me/share/url?url=${window.location.href}`} className="block text-sm mx-4 text-slate-500 hover:text-slate-900 ">
                                        <BsTelegram className="w-4 h-4" />
                                    </a>
                                </li>
                                <li>
                                    <a href={`http://www.facebook.com/share.php?u=${window.location.href}`} className="block text-sm mx-4 text-slate-500 hover:text-slate-900 ">
                                        <BsFacebook className="w-4 h-4" />
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className='md:w-1/2 md:px-7 py-6'>
                        <img className="w-full" src={product.image} />
                    </div>
                </div>
            </>
        )
    }

    if (product.loading) return <Loading />
    if (!product.loading && product.error) return <ErrorTemplate error={product.error} />
    return (
        <div className='px-10'>
            {
                product.data && ProductDetailsTemplate(product.data)
            }
        </div>
    );
}

export default ProductDetails;