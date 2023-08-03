import React, { useState } from 'react'
import { useProducts } from "../Context/ProductsProvider";
import ProductList from "../component/ProductList/ProuductList";
import Loading from '../commen/Loading';
import ErrorTemplate from '../commen/ErrorTemplate';
import HeroSection from '../component/HeroSection/HeroSection';
import { BsFunnel, BsGrid3X3GapFill, BsGridFill, BsX } from 'react-icons/bs';
import { useEffect } from 'react';
import "nouislider/distribute/nouislider.css";
import Nouislider from 'nouislider-react';


const Shop = () => {
    const [gridProduct, setGridProduct] = useState('5');
    const [filteredProducts, setFilterdProducts] = useState({});
    const { products } = useProducts();
    const [pricLimit, setPricLimit] = useState([]);
    const [pricLimitUpdate, setPricLimitUpdate] = useState({});
    const [sort, setSort] = useState('newest');
    const [category, setCategory] = useState('all');
    const [showFilter, setShowFilter] = useState(false)

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
        result = sortPrice(result)
        setFilterdProducts(result);
    }, [products, category, sort, pricLimitUpdate]);

    const onUpdate = (render, handle, value, un, percent) => {
        console.log(handle)
        setPricLimitUpdate({ 'limit': value, 'handle': handle });
    };

    const sortHandler = (e) => {
        setSort(e.target.value.toLowerCase().trim())
    }

    const sortCategory = (data) => {
        if (category === 'all') {
            return data;
        } else {
            return { loading: false, error: null, products: data.products.filter((p) => p.discount !== 0) }
        }
    }

    const sortDate = (data) => {
        const productss = [...data.products].sort((a, b) => {
            if (sort === 'newest') {
                return new Date(a.creatAt) > new Date(b.creatAt) ? 1 : -1
            } else if (sort === 'oldest') {
                return new Date(a.creatAt) > new Date(b.creatAt) ? -1 : 1
            } else if (sort === 'expensive') {
                return a.price > b.price ? -1 : 1
            } else if (sort === 'cheapest') {
                return a.price > b.price ? 1 : -1
            }
        })
        return { loading: false, error: null, products: productss };
    }

    const sortPrice = (data) => {
        const updateProducts = [...data.products]
        if (updateProducts.length) {
            const maxPrice = updateProducts.sort((a, b) => b.price - a.price)[0].price;
            const minPrice = updateProducts.sort((a, b) => b.price - a.price)[updateProducts.length - 1].price;
            setPricLimit([minPrice, maxPrice]);
        }
        let products = [];
        if (isObjEmpty(pricLimitUpdate)) {
            products = data.products.filter((product) => {
                if (pricLimitUpdate.handle === 1) {
                    return product.price == pricLimitUpdate.limit[0] || product.price == pricLimitUpdate.limit[1] || pricLimitUpdate.limit[1] > product.price
                }
                if (pricLimitUpdate.handle === 0) {
                    return product.price == pricLimitUpdate.limit[0] || product.price == pricLimitUpdate.limit[1] || pricLimitUpdate.limit[0] < product.price
                }
            })

        }
        return { loading: false, error: null, products: products }
    }

    const showBoxFilterHandler = () => {
        setShowFilter(!showFilter)
    }

    const isObjEmpty = (obj) => {
        return Object.keys(obj).length !== 0;
    }

    window.addEventListener("resize", () => {
        setShowFilter(false)
    });



    return (
        <>
            <HeroSection title='Shop' />
            <div className='relative w-full h-full'>
                <div className='relative container mx-auto px-4 lg:px-10 lg:mb-10' >
                    <div className='py-5 flex  items-center justify-between lg:hidden'>
                        <p className='text-gray-400 font-semibold text-sm'>{filteredProducts.products && filteredProducts.products.length} products</p>
                        <button type='button' className='flex text-gray-500 justify-end' onClick={showBoxFilterHandler}>
                            <BsFunnel className='w-5 h-5 mr-2' />
                            Filter
                        </button>
                    </div>
                    <div className={`lg:py-8 py-5 border-b border-gray-200 lg:flex  items-center justify-between flex-wrap  transition-all duration-75 ease-linear ${showFilter ? 'filter-box' : 'hidden'}`}>
                        <button className="md:top-10 top-6 right-3 absolute z-1 lg:hidden" onClick={showBoxFilterHandler}>
                            <BsX className="w-10 h-10" />
                        </button>
                        <div className='flex items-center justify-start w-full lg:w-auto mb-3 lg:mb-0'>
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
                        <div className='flex items-center flex-wrap'>
                            <p className='text-gray-400 font-semibold text-sm  hidden lg:inline-block'>{filteredProducts.products && filteredProducts.products.length} products</p>
                            <div className='h-4 bg-gray-200 w-[1px] mx-5 hidden lg:inline-block'></div>
                            <button className='mr-3 hidden lg:inline-block' onClick={(e) => changeGirdProductHandler(e, '4')}>
                                <BsGridFill className={`w-4 h-4 mr-2 ${gridProduct === '4' ? 'text-gray-500' : 'text-gray-400'}`} />
                            </button>
                            <button className='hidden lg:inline-block'>
                                <BsGrid3X3GapFill className={`w-4 h-4 mr-2 ${gridProduct === '5' ? 'text-gray-500' : 'text-gray-400'}`} onClick={(e) => changeGirdProductHandler(e, '5')} />
                            </button>
                            <div className='h-4 bg-gray-200 w-[1px] mx-5 hidden lg:inline-block'></div>
                            <div className='flex text-gray-500 mr-5 lg:mb-0 mb-3 lg:w-auto w-full'>
                                <BsFunnel className='w-5 h-5 mr-2' />
                                Filter
                            </div>
                            <div className='lg:mb-0 mb-8' value={sort}>
                                <select className='' onChange={sortHandler}>
                                    <option value='newest'>Newest</option>
                                    <option value='oldest'>Oldest</option>
                                    <option value='expensive'>Most Expensive</option>
                                    <option value='cheapest'>Cheapest</option>
                                </select>
                            </div>
                            <div className='h-4 bg-gray-200 w-[1px] mx-5 hidden lg:inline-block '></div>
                            <div className='flex lg:items-center lg:flex-row flex-col lg:w-auto w-full '>
                                <label className='text-gray-500 mr-2 lg:mb-0 mb-5'>Price :</label>
                                <div className='w-36 relative lg:mb-0 mb-5'>
                                    <span className='absolute -right-4 top-2 text-sm text-gray-500'>${isObjEmpty(pricLimitUpdate) && pricLimitUpdate.limit[1].toFixed(0)}</span>
                                    {pricLimit.length && <Nouislider
                                        accessibility
                                        range={{ min: pricLimit[0], max: pricLimit[1] }}
                                        start={[pricLimit[0], pricLimit[1]]}
                                        step={1}
                                        connect
                                        onUpdate={onUpdate} />}
                                    <span className='absolute left-0 top-2 text-sm text-gray-500'>${isObjEmpty(pricLimitUpdate) && pricLimitUpdate.limit[0].toFixed(0)}</span>
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