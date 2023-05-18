import React from 'react'
import { useProducts } from "../Context/ProductsProvider";
import ProductList from "../component/ProductList/ProuductList";
import Breadcrumb from '../component/Breadcrumb/Breadcrumb';
import Loading from '../commen/Loading';
import ErrorTemplate from '../commen/ErrorTemplate';

const Shop = () => {
    const { products } = useProducts();
    return (
        <>
            <div className="md:py-56 py-24 bg-[url('/src/assets/img/home.jpg')] bg-cover bg-center bg-no-repeat text-center bg-slate-50">
                <h1 className='md:text-4xl text-2xl font-semibold'>SOBER</h1>
                <Breadcrumb />
            </div>
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