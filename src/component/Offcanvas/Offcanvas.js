import { BsX, BsCart2, BsPersonCheck, BsPerson } from "react-icons/bs";
import { useState } from "react";
import { BsList } from "react-icons/bs";
import { useAuth } from "../../Context/AuthProvider";
import { useCart } from "../../Context/CartProvider";
import { NavLink } from "react-router-dom";
const Offcanvas = ({ children }) => {
    const [IsOpen, setIsOpen] = useState(false);
    const userData = useAuth();
    const { cart } = useCart();

    return (
        <>
            {!IsOpen ?
                (
                    <button className='lg:hidden' onClick={() => setIsOpen(!IsOpen)}>
                        <BsList className="w-5 h-5" />
                    </button>
                ) :
                (
                    <div onClick={() => setIsOpen(!IsOpen)} className={`${!IsOpen && 'hidden'} fixed top-0 left-0 w-full h-full bg-black opacity-5 z-[1550]`}></div>
                )
            }

            <div className={`fixed top-0 left-0 h-full w-[85vw] bg-white z-[1600]  overflow-y-auto flex flex-col
                             ${!IsOpen ? '-translate-x-full' : 'translate-x-0 lg:-translate-x-full'} ease-in-out duration-300 transition-all`}>
                <div className="bg-gray-300 p-5">
                    <h5 className="font-semibold">{userData ? `Hi ${userData.name}` : 'Menu'}</h5>
                    <button className="top-3 right-3 absolute z-[1601]" onClick={() => setIsOpen(!IsOpen)}>
                        <BsX className="w-6 h-6" />
                    </button>
                </div>
                <div className="flex-1">
                    {children}
                </div>
                <div className="p-5">
                    <NavLink to="my-account#cart" className="flex items-center w-full py-4 border-gray-200 border-t border-b">
                        <BsCart2 className="w-5 h-5 mr-6" />
                        <span className="font-semibold text-lg mr-auto">Shoping cart </span>
                        <span className=" bg-slate-900 w-5 h-5 flex justify-center items-center text-sm font-semibold rounded-full text-white">{cart.length}</span>
                    </NavLink>
                    {userData ?
                        <NavLink to='my-account' className=" w-full py-4 border-gray-200 flex items-center" >
                            <BsPersonCheck className="w-5 h-5  mr-6" />
                            <span className="font-semibold text-lg mr-auto">My account</span>
                        </NavLink> :
                        <NavLink to="my-account#login" className="w-full py-4 border-gray-200 flex items-center" >
                            <BsPerson className="w-5 h-5 mr-6" />
                            <span className="font-semibold text-lg mr-auto">Login </span>
                        </NavLink>
                    }
                </div>


            </div>
        </>
    );
}

export default Offcanvas;