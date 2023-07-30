import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Account from '../component/Account/Account';
import { useAuth, useAuthActions } from '../Context/AuthProvider';
import { useCart } from '../Context/CartProvider';
import CartList from '../component/CartList/CartList';
import WishList from '../component/WishList/WishList';
import { useWish } from '../Context/WishProvider';
import Checkout from '../component/CheckOut/Checkout';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Profile from '../component/Profile/Profile';



const MyAccount = () => {
    const userDate = useAuth();
    const { cart } = useCart();
    const { wish } = useWish();
    const location = useLocation();
    const [tabIndex, setTabIndex] = useState(0);
    const navigate = useNavigate();
    const setAuth = useAuthActions();
    const tabs = {
        login: 0,
        myAccount: 0,
        cart: 1,
        wishList: 2,
        checkout: 3,
        logout: 4
    }

    function getObjectKeyByValue(object, value) {
        return Object.keys(object).find(key => object[key] === value);
    }

    const handleChangeTab = (index) => {
        setTabIndex(index);
        navigate('#' + getObjectKeyByValue(tabs, index));
        if (index === 4) {
            setAuth(false);
            navigate('/')
        }
    }

    useEffect(() => {
        const { hash } = location;
        const tabActiveIndex = hash.substring(1);
        const tabActive = tabs[tabActiveIndex] || 0;
        setTabIndex(tabActive);
    }, [location]);

    return (
        <div className="mx-auto" >
            <Tabs className="w-full " selectedTabClassName="active" selectedIndex={tabIndex} onSelect={(index) => handleChangeTab(index)}>
                <TabList className='flex flex-wrap md:mb-16 mb-8 bg-gray-200 lg:px-72 justify-center'>
                    {!userDate && <Tab className="outline-none cursor-pointer line-hover tab-nav flex items-center justify-center py-3 md:py-10 relative px-4 md:mx-3">
                        <h5 className='text-lg font-semibold'>Login</h5>
                    </Tab>}
                    {userDate && <Tab className="outline-none cursor-pointer line-hover tab-nav flex items-center justify-center py-3 md:py-10 relative px-4 md:mx-3">
                        <h5 className='text-lg font-semibold'>My Account</h5>
                    </Tab>}

                    <Tab className="outline-none cursor-pointer line-hover tab-nav flex items-center justify-center py-3 md:py-10 relative px-4 md:mx-3">
                        <h5 className='text-lg mr-2 font-semibold'>Shopping Cart</h5>
                        <span className="bg-gray-400 w-5 h-5 flex justify-center items-center text-sm font-semibold rounded-full text-white transition-all duration-75">{cart.length}</span>
                    </Tab>
                    <Tab className="outline-none cursor-pointer line-hover tab-nav flex items-center justify-center py-3 md:py-10 relative px-4 md:mx-3">
                        <h5 className='text-lg mr-2 font-semibold'>wishlist</h5>
                        <span className="bg-gray-400 w-5 h-5 flex justify-center items-center text-sm font-semibold rounded-full text-white transition-all duration-75">{wish.length}</span>
                    </Tab>
                    <Tab className="outline-none cursor-pointer line-hover tab-nav flex items-center justify-center py-3 md:py-10 relative px-4 md:mx-3">
                        <h5 className='text-lg  font-semibold'>Checkout</h5>
                    </Tab>
                    {userDate && <Tab className="outline-none cursor-pointer line-hover tab-nav flex items-center justify-center py-3 md:py-10 relative px-4 md:mx-3">
                        <h5 className='text-lg  font-semibold'>Logout</h5>
                    </Tab>}
                </TabList>

                {!userDate && <TabPanel className="w-full md:w-4/5 md:px-0 px-7 relative mx-auto">
                    <Account />
                </TabPanel>}
                {userDate && <TabPanel className="w-full md:w-4/5 md:px-0 px-8 relative mx-auto">
                    <Profile />
                </TabPanel>}
                <TabPanel className="w-full md:w-4/5 md:px-0 px-8 relative mx-auto">
                    <CartList />
                </TabPanel>
                <TabPanel className="w-full md:w-4/5 md:px-0 px-8 relative mx-auto">
                    <WishList />
                </TabPanel>
                <TabPanel className="w-full md:w-4/5 md:px-0 px-8 relative mx-auto">
                    <Checkout />
                </TabPanel>
                {userDate && <TabPanel className="w-full md:w-4/5 md:px-0 px-8 relative mx-auto"> </TabPanel>}
            </Tabs>
        </div>
    );
}

export default MyAccount;