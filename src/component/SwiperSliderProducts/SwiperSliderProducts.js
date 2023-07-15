
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay } from "swiper";
import Product from '../Prouduct/Product';
import { useCartActions } from '../../Context/CartProvider';
import { useWishActions } from '../../Context/WishProvider';
import { toast } from 'react-toastify';

function SwiperSliderProducts({ products }) {
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
        <Swiper
            spaceBetween={10}
            slidesPerView={1}
            breakpoints={{
                // when window width is >= 576px
                576: {
                    slidesPerView: 1,
                },
                // when window width is >= 768px
                768: {
                    slidesPerView: 2,
                },
                // when window width is >= 1024px
                1024: {
                    spaceBetween: 5,
                    slidesPerView: 3,
                },
                1280: {
                    slidesPerGroup: 5,
                    slidesPerView: 4,
                },
            }}
            modules={[Autoplay]}
            autoplay={{
                delay: 3000,
                disableOnInteraction: false,
            }}
        >
            {
                products.products.map((product) => (
                    <SwiperSlide key={product.id}>
                        <Product
                            key={product.id}
                            product={product}
                            addCart={(e) => handleAddCart(e, product)}
                            addWish={(e) => handleAddWish(e, product)} />
                    </SwiperSlide>
                ))
            }
        </Swiper>
    )
}

export default SwiperSliderProducts