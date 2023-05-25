import { Link } from "react-router-dom";
import { BsInstagram, BsTelegram, BsWhatsapp, BsFacebook } from "react-icons/bs";
import React from "react";
import Input from '../../commen/Input'
import { useFormik } from "formik";
import * as Yup from 'yup'
const Footer = () => {
    const initialValues = {
        email: ''
    }
    const validationSchema = Yup.object({
        email: Yup.string().email('Eamil invail format').required('Email is required'),
    })
    const onSubmit = (values) => {
        console.log(values)
    }
    const formik = useFormik({
        initialValues,
        validationSchema,
        validateOnMount: true,
        enableReinitialize: true,
        onSubmit

    })
    return (
        <footer className="px-4 md:px-0" onSubmit={formik.handleSubmit}>
            <div className=" border-t border-gray-100 pt-14 ">
                <h5 className="text-xl font-semibold mb-10 text-center">Newsletter</h5>
                <p className="text-center mb-10">Get timely updates from your favorite products</p>
                <form className="flex flex-col md:flex-row w-full md:w-2/3 mx-auto md:items-end">
                    <Input formik={formik} placeholder="Enter your email adress" name="email" style="w-full md:mr-3" />
                    <button className="border-b-2 border-gray-300 text-lg p-3 mb-6 hover:border-gray-900 transition-all duration-300">
                        Subscribe
                    </button>
                </form>
            </div>
            <div className="md:mx-10 mx-4  border-t border-gray-100 py-5 flex md:flex-row flex-col justify-between">
                <div className="w-full md:w-1/2 flex md:justify-start justify-center items-center mb-3 md:mb-0">
                    <p className="text-sm font-semibold text-slate-900 mr-4">@2022 SOBER</p>
                    <ul className="flex justify-between items-center leading-none ">
                        <li>
                            <Link to='blog' className="text-sm mx-4 text-slate-500 hover:text-slate-900 ">Blog</Link>
                        </li>
                        <li>
                            <Link to='faq' className="text-sm mx-4 text-slate-500 hover:text-slate-900 ">FAQs</Link>
                        </li>
                        <li>
                            <Link to='contact-us' className="text-sm mx-4 text-slate-500 hover:text-slate-900 ">Contact us</Link>
                        </li>
                    </ul>
                </div>
                <div className="w-full  md:w-1/2 flex md:justify-end justify-center items-center">
                    <ul className="flex items-center leading-none">
                        <li>
                            <a href='https://www.instagram.com/' className="block text-sm mx-4 text-slate-500 hover:text-slate-900 ">
                                <BsInstagram className="w-4 h-4" />
                            </a>
                        </li>
                        <li>
                            <a href='https://wa.me' className="block text-sm mx-4 text-slate-500 hover:text-slate-900 ">
                                <BsWhatsapp className="w-4 h-4" />
                            </a>
                        </li>
                        <li>
                            <a href='https://t.me' className="block text-sm mx-4 text-slate-500 hover:text-slate-900 ">
                                <BsTelegram className="w-4 h-4" />
                            </a>
                        </li>
                        <li>
                            <a href='http://www.facebook.com' className="block text-sm mx-4 text-slate-500 hover:text-slate-900 ">
                                <BsFacebook className="w-4 h-4" />
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </footer>
    );
}

export default React.memo(Footer);