import React from 'react'
import Breadcrumb from '../component/Breadcrumb/Breadcrumb'
import { BsHouseFill, BsTelephoneFill, BsFillEnvelopeFill } from "react-icons/bs";

function ContactUs() {
    return (
        <>
            <div className="md:py-56 py-24 bg-[url('/src/assets/img/home.jpg')] bg-cover bg-center bg-no-repeat text-center bg-slate-50">
                <h1 className='md:text-4xl text-2xl font-semibold'>Contact Us</h1>
                <Breadcrumb />
            </div>
            <div className='py-10 '>
                <div className='w-1/2 mx-auto'>
                    <p className='text-gray-500 text-lg mb-10'>
                        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                    </p>
                    <div className='flex items-center mb-8'>
                        <BsHouseFill className='text-gray-400 w-6 h6 mr-5' />
                        <p className='text-gray-400 font-semibold mr-12'>ADDRESS</p>
                        <p className='font-semibold'>9606 North MoPac Expressway Suite 700 Austin, TX 78759</p>
                    </div>
                    <div className='flex items-center mb-8'>
                        <BsTelephoneFill className='text-gray-400 w-6 h6 mr-5' />
                        <p className='text-gray-400 font-semibold mr-12'>PHONE</p>
                        <a href='tel:+1 248-785-8545' className='font-semibold'>+1 248-785-8545</a>
                    </div>
                    <div className='flex items-center mb-8'>
                        <BsFillEnvelopeFill className='text-gray-400 w-6 h6 mr-5' />
                        <p className='text-gray-400 font-semibold mr-12'>EMAIL</p>
                        <a href='tel:+1 248-785-8545' className='font-semibold'>sober@google.com</a>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ContactUs