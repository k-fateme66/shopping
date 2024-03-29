
import { BsCart2, BsHeart, BsCheck2, BsHeartFill } from "react-icons/bs";
import { useCart } from "../../Context/CartProvider";
import { useWish } from "../../Context/WishProvider";
import { checkInCart } from "../../utils/CheckInCart";
import { NavLink } from "react-router-dom";
import ProgressiveImg from "../../commen/ProgressiveImg";
import placeholderSrc from '../../assets/img/placeholder.jpg'
const Product = ({ product, addCart, addWish }) => {
    const { cart } = useCart();
    const { name, price, image, discount, id, offPrice } = product;
    const checkCart = checkInCart(cart, id);
    const { wish } = useWish();
    const checkWishList = checkInCart(wish, id);


    return (
        <NavLink to={`/product/${product.name}?id=${product.id}`} className="text-center mb-0 md:mb-11 group ">
            <div className="relative overflow-hidden">
                <ProgressiveImg src={image} alt={name} className="w-full object-cover h-64 object-center" placeholderSrc={placeholderSrc} />
                <ProgressiveImg src={image} alt={name} className="group-hover:opacity-100 -scale-x-100 object-cover h-64 object-center w-full absolute top-0  left-0 opacity-0 transition-opacity duration-500 ease-linear" placeholderSrc={placeholderSrc} />
                {discount !== 0 ? <span className='absolute top-8 left-0 flex align-center justify-center bg-green-400 text-white px-3  text-sm font-bold'>{discount}%</span> : ''}
                <div className='md:flex items-center justify-center absolute top-full w-full hidden'>
                    <button onClick={addCart} className="bg-stone-900 flex items-center justify-center h-12 w-12 rounded-full mr-5 opacity-0 group-hover:opacity-100 group-hover:-translate-y-16  transition-all duration-500 ease-linear">
                        {(cart.length && checkCart) ?
                            <>
                                <BsCheck2 className="w-5 h-5 text-white" />
                                <span className="flex items-center justify-center bg-white text-sm rounded-full w-4 h-4 absolute top-2 right-1">{checkCart.quantity}</span>
                            </>
                            :
                            <BsCart2 className="w-5 h-5 text-white" />
                        }
                    </button>
                    <button onClick={addWish} className="bg-stone-900 flex items-center justify-center h-12 w-12 rounded-full opacity-0 group-hover:opacity-100 group-hover:-translate-y-16  transition-all duration-400 ease-linear delay-100">
                        {(wish.length && checkWishList) ?
                            <BsHeartFill className="w-5 h-5 text-white" /> : <BsHeart className="w-5 h-5 text-white" />
                        }
                    </button>
                </div>
            </div>
            <h3 className="py-2 font-semibold">{name}</h3>
            <div className="flex items-center justify-center">
                <span className="font-bold ">
                    {discount !== 0 ? offPrice : price}
                </span>
                {discount !== 0 ? <span className='ml-5 text-sm text-gray-400 line-through font-bold'>${price}</span> : ''}
            </div>
        </NavLink>
    );
}

export default Product;