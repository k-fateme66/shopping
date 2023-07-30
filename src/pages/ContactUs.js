import React from 'react'
import { BsHouseFill, BsTelephoneFill, BsFillEnvelopeFill } from "react-icons/bs";
import HeroSection from '../component/HeroSection/HeroSection';

function ContactUs() {
    return (
        <>
            <HeroSection title='Contact Us' />
            <div className='py-10 '>
                <div className='md:w-1/2 mx-auto px-4' >
                    <p className='text-gray-500 text-lg mb-10'>
                        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                    </p>
                    <div className='flex items-center mb-8'>
                        <div className='flex items-center'>
                            <BsHouseFill className='text-gray-400 w-6 h6 mr-5' />
                            <p className='text-gray-400 font-semibold mr-12 w-20'>ADDRESS</p>
                        </div>
                        <p className='font-semibold'>9606 North MoPac Expressway Suite 700 Austin, TX 78759</p>
                    </div>
                    <div className='flex items-center mb-8'>
                        <div className='flex items-center'>
                            <BsTelephoneFill className='text-gray-400 w-6 h6 mr-5' />
                            <p className='text-gray-400 font-semibold mr-12 w-20'>PHONE</p>
                        </div>
                        <a href='tel:+1 248-785-8545' className='font-semibold'>+1 248-785-8545</a>
                    </div>
                    <div className='flex items-center mb-8'>
                        <div className='flex items-center'>
                            <BsFillEnvelopeFill className='text-gray-400 w-6 h6 mr-5' />
                            <p className='text-gray-400 font-semibold mr-12 w-20'>EMAIL</p>
                        </div>
                        <a href='mailto:sober@google.com' className='font-semibold'>sober@google.com</a>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ContactUs