import { useState } from "react";
import { useCartActions } from "../../Context/CartProvider";
import Product from "../Prouduct/Product";
import { toast } from 'react-toastify';
import { useWishActions } from "../../Context/WishProvider";

const ProductList = ({ products }) => {
    const dispatch = useCartActions();
    const dispatchWish = useWishActions();
    const handleAddCart = (e, product) => {
        e.preventDefault();
        toast.success(`${product.name} add to cart!`)
        dispatch({ type: 'ADD_TO_CART', payLoad: product })
    }
    const handleAddWish = (e, product) => {
        e.preventDefault();
        dispatchWish({ type: 'TOGGLE_TO_WISH', payLoad: product })
    }
    return (
        <section className='py-10'>
            <div className='px-10 mx-auto grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 gap-4'>
                {
                    products.map((product) => {
                        return <Product
                            key={product.id}
                            product={product}
                            addCart={(e) => handleAddCart(e, product)}
                            addWish={(e) => handleAddWish(e, product)} />
                    })
                }
            </div>
        </section>
    );
}

export default ProductList;
