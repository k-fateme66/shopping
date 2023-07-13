import { createContext, useContext, useEffect, useState } from "react";
import { getProduct, getProducts } from "../services/productsService";

const ProductsContext = createContext();
const ProductsContextDispatcher = createContext();

const ProductsProvider = ({ children }) => {
    const [products, setProducts] = useState({
        loading: false,
        products: [],
        error: null
    });
    const [product, setProduct] = useState({
        loading: false,
        data: [],
        error: null
    })
    const [path, setPath] = useState('')

    const getData = async () => {
        try {
            const { data } = await getProducts();
            setProducts({ ...products, loading: false, error: null, products: data })
        } catch (error) {
            setProducts({ ...products, loading: false, error: error.message, products: [] })
        }
    }
    const getSingleProduct = async (path) => {
        try {
            const { data } = await getProduct(path);
            setProduct({ ...product, loading: false, error: null, data: data })
        } catch (error) {
            setProduct({ ...product, loading: false, error: error.message, data: {} })
        }
    }
    useEffect(() => {
        setProducts({ ...products, loading: true, error: null, products: [] })
        getData();
        if (path) {
            setProduct({ ...product, loading: true, error: null, data: {} })
            getSingleProduct(path)
        }
    }, [path])
    return (
        <ProductsContext.Provider value={{ products, product, setPath }}>
            <ProductsContextDispatcher.Provider value={setProducts}>
                {children}
            </ProductsContextDispatcher.Provider>
        </ProductsContext.Provider>
    );
}

export default ProductsProvider;

export const useProducts = () => useContext(ProductsContext);
export const useProductsActions = () => useContext(ProductsContextDispatcher);
