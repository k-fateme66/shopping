import React, { useCallback, useEffect, useState } from 'react'
import ProductList from '../component/ProductList/ProuductList';
import { useProducts } from '../Context/ProductsProvider';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import ErrorTemplate from '../commen/ErrorTemplate';
import Loading from '../commen/Loading';
import HeroSection from '../component/HeroSection/HeroSection';
import { useHero, useHeroActions } from '../Context/HeroProvider';

function HomePage() {
    const [tabIndex, setTabIndex] = useState(0);
    const [productsTab, setProductsTab] = useState([]);
    const [dataProducts, setDataProducts] = useState([])
    const { products } = useProducts();
    const setHero = useHeroActions();

    useEffect(() => {
        setDataProducts(products);
        setHero(true);
    }, [])
    const handleChangeTab = useCallback((index) => {
        let salesProducts = []
        setTabIndex(index);
        switch (index) {
            case 0:
                salesProducts = dataProducts
                break;
            case 1:
                salesProducts = dataProducts.products.filter((p) => p.discount == 0)
                break;
            case 2:
                salesProducts = dataProducts.products.filter((p) => p.discount !== 0)
                console.log(salesProducts);
                break;
            default:
                salesProducts = dataProducts
        }
        setProductsTab(salesProducts)
    }, [tabIndex, productsTab, dataProducts]);
    return (
        <>
            <HeroSection title='SOBER' />
            {<div className='relative container mx-auto px-4'>
                <Tabs className="flex flex-col justify-center items-center" selectedTabClassName="active" selectedIndex={tabIndex} onSelect={(index) => handleChangeTab(index)}>
                    <TabList className="flex md:py-10 py-5 md:justify-center justify-between items-center w-full">
                        <Tab className="outline-none text-center cursor-pointer line-hover tab-nav flex items-center justify-center py-3 relative md:px-5 mx-2">
                            <h5 className='text-base  font-semibold'> All</h5>
                        </Tab>
                        <Tab className="outline-none text-center cursor-pointer line-hover tab-nav flex items-center justify-center py-3 relative md:px-5 mx-2">
                            <h5 className='text-base  font-semibold'> New Products</h5>
                        </Tab>
                        <Tab className="outline-none text-center cursor-pointer line-hover tab-nav flex items-center justify-center py-3 relative md:px-5 mx-2">
                            <h5 className='text-base  font-semibold'>Sales Products</h5>
                        </Tab>
                    </TabList>
                    <TabPanel>
                        {
                            products.loading ?
                                <Loading /> :
                                !products.loading && products.error ?
                                    <ErrorTemplate error={products.error} /> :
                                    products.products && products.products.length && <ProductList products={products.products} />
                        }
                    </TabPanel>
                    <TabPanel>
                        {
                            <ProductList products={productsTab} />
                        }
                    </TabPanel>
                    <TabPanel>
                        {
                            <ProductList products={productsTab} />
                        }
                    </TabPanel>
                </Tabs>
            </div>}
        </>
    )
}

export default HomePage