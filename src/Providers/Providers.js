import AuthProvider from "../Context/AuthProvider";
import CartProvider from "../Context/CartProvider";
import HeroProvider from "../Context/HeroProvider";
import PostsProvider from "../Context/PostsProvider";
import ProductsProvider from "../Context/ProductsProvider";
import WishProvider from "../Context/WishProvider";

const Providers = ({ children }) => {
    return (
        <AuthProvider>
            <ProductsProvider>
                <WishProvider>
                    <CartProvider>
                        <PostsProvider>
                            <HeroProvider>
                                {children}
                            </HeroProvider>
                        </PostsProvider>
                    </CartProvider>
                </WishProvider>
            </ProductsProvider>
        </AuthProvider>
    );
}

export default Providers;