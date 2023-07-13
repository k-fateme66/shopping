import { BsCart2, BsHeart, BsPerson, BsSearch, BsPersonCheck, BsX } from "react-icons/bs";
import { useCart } from "../../Context/CartProvider";
import Cart from "../Cart/Cart";
import { useWish } from "../../Context/WishProvider";
import Account from "../Account/Account";
import { useEffect, useState } from "react";
import Modal from 'react-modal';
import { NavLink, useLocation } from "react-router-dom";
import { useAuth } from "../../Context/AuthProvider";
const customStylesModal = {
    overlay: {
        zIndex: 2
    },
    content: {
        top: '0',
        left: '0',
        right: '0',
        bottom: '0'
    },
};

const ToolsHeader = () => {
    const { cart } = useCart();
    const { wish } = useWish();
    const userDate = useAuth();
    const [modalIsOpenAccount, setIsOpenAccount] = useState(false);
    const [modalIsOpenCart, setIsOpenCart] = useState(false);
    const [modalIsOpenWishList, setIsOpenWishList] = useState(false);
    let location = useLocation();
    useEffect(() => {
        if (modalIsOpenCart) setIsOpenCart(false);
        if (modalIsOpenAccount) setIsOpenAccount(false);
        if (modalIsOpenWishList) setIsOpenWishList(false);
    }, [location]);
    Modal.setAppElement('body');
    function openModalAccount() {
        setIsOpenAccount(true);
    }
    function closeModalAccount() {
        setIsOpenAccount(false);
    }
    function openModalCart() {
        setIsOpenCart(true);
    }
    function closeModalCart() {
        setIsOpenCart(false);
    }
    function openModalWishList() {
        setIsOpenWishList(true);
    }
    function closeModalWishList() {
        setIsOpenWishList(false);
    }
    return (

        <div className='flex-1 w-auto text-right'>
            <ul className="flex justify-end">
                <li className="lg:block hidden">
                    <button type="button" className="md:mr-5">
                        <BsSearch className="w-4 h-4" />
                    </button>
                </li>
                <li>
                    {userDate ?
                        <NavLink to='my-account' className="md:mr-5 block" >
                            <BsPersonCheck className="w-5 h-5" />
                        </NavLink> :
                        <>
                            <button type="button" className="md:mr-5" onClick={openModalAccount}>
                                <BsPerson className="w-5 h-5" />
                            </button>
                            <Modal
                                closeTimeoutMS={500}
                                isOpen={modalIsOpenAccount}
                                onRequestClose={closeModalAccount}
                                style={customStylesModal}
                                contentLabel="Example Modal">
                                <div className="md:p-10 py-5 relative">
                                    <h4 className="text-[32px]">Account</h4>
                                    <button className="md:top-10 top-6 md:right-9 right-0 absolute z-10" onClick={closeModalAccount}>
                                        <BsX className="w-10 h-10" />
                                    </button>
                                </div>
                                <Account close={closeModalAccount} />
                            </Modal>
                        </>
                    }
                </li>
                <li className="lg:block hidden md:mr-5">
                    <button type="button" className="flex" onClick={openModalCart}>
                        <BsCart2 className="w-5 h-5 mr-1" />
                        <span className="bg-slate-900 w-5 h-5 flex justify-center items-center text-sm font-semibold rounded-full text-white">{cart.length}</span>
                    </button>
                    <Modal
                        closeTimeoutMS={500}
                        isOpen={modalIsOpenCart}
                        onRequestClose={closeModalCart}
                        style={customStylesModal}
                        contentLabel="Example Modal">
                        <Cart tabActive={1} close={closeModalCart} />
                    </Modal>
                </li>
                <li className="lg:block hidden">
                    <button type="button" className=" flex" onClick={openModalWishList}>
                        <BsHeart className="w-5 h-5 mr-1" />
                        <span className="bg-slate-900 w-5 h-5 flex justify-center items-center text-sm font-semibold rounded-full text-white">{wish.length}</span>
                    </button>
                    <Modal
                        closeTimeoutMS={500}
                        isOpen={modalIsOpenWishList}
                        onRequestClose={closeModalWishList}
                        style={customStylesModal}
                        contentLabel="Example Modal">
                        <Cart tabActive={2} close={closeModalWishList} />
                    </Modal>
                </li>
            </ul>
        </div>

    );
}

export default ToolsHeader;