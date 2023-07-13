import React from 'react'
import { useProducts } from "../Context/ProductsProvider";
import ProductList from "../component/ProductList/ProuductList";
import Breadcrumb from '../component/Breadcrumb/Breadcrumb';
import Loading from '../commen/Loading';
import ErrorTemplate from '../commen/ErrorTemplate';
import HeroSection from '../component/HeroSection/HeroSection';

const Shop = () => {
    const { products } = useProducts();
    return (
        <>
            <HeroSection title='Shop' />
            <div className='relative w-full h-full'>
                {products.loading ?
                    <Loading /> :
                    !products.loading && products.error ?
                        <ErrorTemplate error={products.error} /> :
                        products.products && products.products.length && <ProductList products={products.products} />
                }
            </div>
        </>
    )
}

export default Shop;