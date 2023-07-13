import React, { useCallback, useEffect, useState } from 'react'
import ProductList from '../component/ProductList/ProuductList';
import { useProducts } from '../Context/ProductsProvider';
import Breadcrumb from '../component/Breadcrumb/Breadcrumb';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import ErrorTemplate from '../commen/ErrorTemplate';
import Loading from '../commen/Loading';
import HeroSection from '../component/HeroSection/HeroSection';

function HomePage() {
    const [tabIndex, setTabIndex] = useState(0);
    const [productsTab, setProductsTab] = useState([]);
    const { products } = useProducts();
    const handleChangeTab = useCallback((index) => {
        let salesProducts = []
        setTabIndex(index);
        switch (index) {
            case 0:
                salesProducts = products
                break;
            case 1:
                salesProducts = products.products.filter((p) => p.discount == 0)
                break;
            case 2:
                salesProducts = products.products.filter((p) => p.discount !== 0)
                break;
            default:
                salesProducts = products
        }
        setProductsTab(salesProducts)
    }, [tabIndex, productsTab]);
    return (
        <>
            <HeroSection title='SOBER' />
            {<div className='relative container mx-auto px-4'>
                <Tabs className="flex flex-col justify-center items-center pt-10" selectedTabClassName="active" selectedIndex={tabIndex} onSelect={(index) => handleChangeTab(index)}>
                    <TabList className="flex justify-center items-center w-full mb-5">
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