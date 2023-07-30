import React, { useState } from 'react'
import { useProducts } from "../Context/ProductsProvider";
import ProductList from "../component/ProductList/ProuductList";
import Loading from '../commen/Loading';
import ErrorTemplate from '../commen/ErrorTemplate';
import HeroSection from '../component/HeroSection/HeroSection';
import { BsFunnel, BsGrid3X3GapFill, BsGridFill } from 'react-icons/bs';
import { useEffect } from 'react';
import "nouislider/distribute/nouislider.css";
import Nouislider from 'nouislider-react';


const Shop = () => {
    const [gridProduct, setGridProduct] = useState('5');
    const [filteredProducts, setFilterdProducts] = useState({ loading: true, error: null, products: [] });
    const { products } = useProducts();
    const [pricLimit, setPricLimit] = useState([]);
    const [pricLimitUpdate, setPricLimitUpdate] = useState([]);
    const [sort, setSort] = useState('newest');
    const [category, setCategory] = useState('all');
    const changeGirdProductHandler = (e, count) => {
        setGridProduct(count)
    }

    const changeCategoryHandler = (e) => {
        e.preventDefault();
        const filter = e.target.dataset.products.toLowerCase().trim();
        setCategory(filter)
        if (category === 'all') {
            e.target.previousElementSibling.classList.remove('active')
            e.target.classList.add('active');
        } else {
            e.target.nextElementSibling.classList.remove('active')
            e.target.classList.add('active');
        }
    }

    useEffect(() => {
        let result = { ...products };
        result = sortCategory(result);
        result = sortDate(result);
        setFilterdProducts(result);

    }, [products, category, sort,]);

    useEffect(() => {
        if (filteredProducts.products.length) {
            const maxPrice = filteredProducts.products.sort((a, b) => b.price - a.price)[0].price;
            setPricLimit([0, maxPrice]);
        }
    }, [filteredProducts]);

    const onUpdate = (render, handle, value, un, percent) => {
        setPricLimitUpdate(value)
    };
    const sortHandler = (e) => {
        setSort(e.target.value.toLowerCase().trim())
        console.log(e.target.value.toLowerCase().trim())
    }
    const sortCategory = (array) => {
        if (category === 'all') {
            return array;
        } else {
            return { loading: false, error: null, products: array.products.filter((p) => p.discount !== 0) }
        }
    }
    const sortDate = (array) => {
        const productss = array.products.sort((a, b) => {
            if (sort === 'newest') {
                console.log(new Date(a.creatAt) > new Date(b.creatAt))
                return new Date(a.creatAt) > new Date(b.creatAt) ? 0 : 1
            } else if (sort === 'oldest') {
                return new Date(a.creatAt) > new Date(b.creatAt) ? 1 : 0
            } else if (sort === 'expensive') {
                return a.price > b.price ? 1 : 0
            } else if (sort === 'cheapest') {
                return a.price > b.price ? 0 : 1
            }
        })
        console.log(productss);
        return { loading: false, error: null, products: productss };
    }
    return (
        <>
            <HeroSection title='Shop' />
            <div className='relative w-full h-full'>
                <div className='relative container mx-auto px-4 md:px-10'>
                    <div className='py-8 border-b border-gray-200 flex items-center justify-between'>
                        <div className='flex items-center'>
                            <button
                                type='button'
                                className='font-semibold relative mr-6 capitalize text-md md:line-hover py-3 md:border-0 block border-l-4 border-transparent active'
                                data-products='all'
                                onClick={changeCategoryHandler}
                            >
                                All Products
                            </button>
                            <button
                                type='button'
                                className='font-semibold relative  capitalize text-md md:line-hover py-3 md:border-0 block border-l-4 border-transparent'
                                data-products='sale'
                                onClick={changeCategoryHandler}
                            >
                                Sale Products
                            </button>
                        </div>
                        <div className='flex items-center'>
                            <p className='text-gray-400 font-semibold text-sm'>{filteredProducts.products && filteredProducts.products.length} products</p>
                            <div className='h-4 bg-gray-200 w-[1px] mx-5'></div>
                            <button className='mr-3' onClick={(e) => changeGirdProductHandler(e, '4')}>
                                <BsGridFill className={`w-4 h-4 mr-2 ${gridProduct === '4' ? 'text-gray-500' : 'text-gray-400'}`} />
                            </button>
                            <button>
                                <BsGrid3X3GapFill className={`w-4 h-4 mr-2 ${gridProduct === '5' ? 'text-gray-500' : 'text-gray-400'}`} onClick={(e) => changeGirdProductHandler(e, '5')} />
                            </button>
                            <div className='h-4 bg-gray-200 w-[1px] mx-5'></div>
                            <div className='flex text-gray-500 mr-5'>
                                <BsFunnel className='w-5 h-5 mr-2' />
                                Filter
                            </div>
                            <div className='' value={sort}>
                                <select className='' onChange={sortHandler}>
                                    <option value='newest'>Newest</option>
                                    <option value='oldest'>Oldest</option>
                                    <option value='expensive'>Most Expensive</option>
                                    <option value='cheapest'>Cheapest</option>
                                </select>
                            </div>
                            <div className='h-4 bg-gray-200 w-[1px] mx-5'></div>
                            <div className='flex items-center'>
                                <label className='text-gray-500 mr-2'>Price :</label>
                                <div className='w-36 relative'>
                                    <span className='absolute -right-4 top-2 text-sm text-gray-500'>${pricLimitUpdate.length && pricLimitUpdate[1].toFixed(0)}</span>
                                    {pricLimit.length && <Nouislider
                                        accessibility
                                        range={{ min: pricLimit[0], max: pricLimit[1] }}
                                        start={[pricLimit[0], pricLimit[1]]}
                                        step={1}
                                        connect
                                        onUpdate={onUpdate} />}
                                    <span className='absolute left-0 top-2 text-sm text-gray-500'>${pricLimitUpdate.length && pricLimitUpdate[0].toFixed(0)}</span>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                {filteredProducts.loading ?
                    <Loading /> :
                    !filteredProducts.loading && filteredProducts.error ?
                        <ErrorTemplate error={filteredProducts.error} /> :
                        filteredProducts.products && filteredProducts.products.length && <ProductList grid={gridProduct} products={filteredProducts.products} />
                }
            </div>
        </>
    )
}

export default Shop;