import { useState } from "react";
import { BsX } from "react-icons/bs";
import { useAuth } from "../../Context/AuthProvider";
import ForgotPassword from "../ForgotPassword/ForgotPassword";
import Login from "../Login/Login";
import Register from "../Register/Register";
const Account = ({ close }) => {
    const [openTab, setOpenTab] = useState(1);
    const [showForm, setShowForm] = useState(false);
    const userDate = useAuth();
    const changeTabHandler = (e, tabNum) => {
        e.preventDefault();
        setOpenTab(tabNum);
    }
    const handleChangeForm = (e) => {
        e.preventDefault();
        setShowForm(!showForm)
    }
    return (
        <>
            <div className="flex flex-col items-center justify-center">
                <ul className="flex space-x-2">
                    <li>
                        <a
                            href="#"
                            onClick={(e) => changeTabHandler(e, 1)}
                            className="inline-block px-4 py-2"
                        >
                            <div className={`${openTab === 1 ? "active" : ""} py-2 line-hover tab-nav flex items-center justify-center w-full mb-8 relative`}>
                                <h4 className="md:text-xl text-lg font-semibold ">{!showForm ? 'Login' : 'Forgot Password'}</h4>
                            </div>
                        </a>
                    </li>
                    <li>
                        <a
                            href="#"
                            onClick={(e) => changeTabHandler(e, 2)}
                            className="inline-block px-4 py-2"
                        >
                            <div className={`${openTab === 2 ? "active" : ""} py-2 line-hover tab-nav flex items-center justify-center w-full mb-8 relative`}>
                                <h4 className="md:text-xl text-lg font-semibold">Register</h4>
                            </div>
                        </a>
                    </li>
                </ul>
                <div className="md:w-4/5 relative z-0 w-full mx-auto">
                    <div className={`${openTab === 1 ? "active" : ""} tab-panel`}>
                        {!showForm ? <Login changeForm={(e) => handleChangeForm(e)} /> : <ForgotPassword changeForm={(e) => handleChangeForm(e)} />}
                    </div>
                    <div className={`${openTab === 2 ? "active" : ""} tab-panel`}>
                        <Register />
                    </div>
                </div>
            </div>

        </>);
}

export default Account;