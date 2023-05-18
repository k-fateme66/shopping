import { useFormik } from 'formik';
import { BsX } from "react-icons/bs";
import Input from '../../commen/Input';
import * as Yup from 'yup'
import Textarea from '../../commen/Textarea';
import { useAuth } from '../../Context/AuthProvider';
import { useState } from 'react';
import { useCart, useCartActions } from "../../Context/CartProvider";

const initialValues = {
    name: '',
    tel: '',
    cellPhone: '',
    address: '',
    email: ''
}

const validationSchema = Yup.object({
    email: Yup.string().email('Eamil invail format').required('Email is required'),
    name: Yup.string().required('Name is required'),
    tel: Yup.string().required('Tel is required'),
    cellPhone: Yup.string().required('CellPhone is required'),
    address: Yup.string().required('Address is required'),
})

const Checkout = () => {
    const [formValues, setFormValues] = useState();
    const { cart, total } = useCart();
    const originalTotalPrice = cart.length ? cart.reduce((acc, curr) => acc + curr.quantity * curr.price, 0) : 0;
    const auth = useAuth();
    const DataValues = {
        name: auth.name,
        tel: auth.tel,
        cellPhone: auth.phoneNumber,
        address: auth.address,
        email: auth.email
    }
    const onSubmit = (values) => {
        console.log(values)
    }
    const formik = useFormik({
        initialValues: DataValues || initialValues,
        validationSchema,
        validateOnMount: true,
        enableReinitialize: true,
        onSubmit
    });


    return (
        <div className='md:w-10/12 mx-auto'>
            <form onSubmit={formik.handleSubmit}>
                <h3 className="text-xl font-semibold mb-10">Billing Details</h3>
                <div className="border-slate-200 border md:p-12 p-8">
                    <div className='flex md:items-center mb-10 md:flex-row flex-col item-start'>
                        <div className='md:w-1/6 w-full'>
                            <label className=' mb-4 '>Name
                                <span className='pl-1 text-red-500 '>*</span>
                            </label>
                        </div>
                        <div className='md:w-5/6 w-full'>
                            <Input name="name" formik={formik} placeholder='Enter Name' style='w-full' />
                        </div>
                    </div>
                    <div className='flex md:items-center mb-10 md:flex-row flex-col item-start'>
                        <div className='md:w-1/6 w-full'>
                            <label className=' mb-4'>Email
                                <span className='pl-1 text-red-500 '>*</span>
                            </label>
                        </div>
                        <div className=' md:w-5/6 w-full'>
                            <Input name="email" formik={formik} placeholder='Enter Email' style='w-full' />
                        </div>
                    </div>
                    <div className='flex md:items-center mb-10 md:flex-row flex-col item-start'>
                        <div className='md:w-1/6 w-full'>
                            <label className=' mb-4'>Tel
                                <span className='pl-1 text-red-500 '>*</span>
                            </label>
                        </div>
                        <div className=' md:w-5/6 w-full'>
                            <Input name="tel" formik={formik} placeholder='Enter Tel' style='w-full' type='tel' />
                        </div>
                    </div>
                    <div className='flex md:items-center mb-10 md:flex-row flex-col item-start'>
                        <div className='md:w-1/6 w-full'>
                            <label className=' mb-4'>CellPhone
                                <span className='pl-1 text-red-500 '>*</span>
                            </label>
                        </div>
                        <div className=' md:w-5/6 w-full'>
                            <Input name="cellPhone" formik={formik} placeholder='Enter CellPhone' style='w-full' type='tel' />
                        </div>
                    </div>
                    <div className='flex md:items-center mb-10 md:flex-row flex-col item-start'>
                        <div className='md:w-1/6 w-full'>
                            <label className=' mb-4'>Address
                                <span className='pl-1 text-red-500 '>*</span>
                            </label>
                        </div>
                        <div className=' md:w-5/6 w-full'>
                            <Textarea name="address" formik={formik} placeholder='Enter Address' style='w-full' />
                        </div>
                    </div>

                </div>
                {cart.length ? <>
                    <h3 className="text-xl font-semibold my-10 ">Your order</h3>
                    <div className="border-slate-200 border p-12">
                        {
                            cart.map((item, index) => (
                                <div className={`flex  border-slate-200 py-5 ${index !== 0 && 'border-t'}`} key={item._id}>
                                    <div className="flex items-center basis-1/3">
                                        <img src={item.image} className="w-20 h-20 object-cover mr-10" />
                                        <span className="text-base">{item.name}</span>
                                    </div>
                                    <div className='flex items-center justify-center basis-1/4'>
                                        <span className='text-lg text-gray-500 mr-3 flex items-center'><BsX className="w-4 h-4 text-gray-500" />{item.quantity}</span>
                                    </div>
                                    <div className='flex items-center justify-center basis-1/4'>
                                        <p>${item.offPrice * item.quantity} </p>
                                    </div>
                                </div>
                            ))
                        }
                        <div className='flex border-slate-200 py-5 border-t'>
                            <div className="flex items-center basis-1/3">
                                <span className="text-base font-semibold">SUBTOTAL</span>
                            </div>
                            <div className='flex items-center justify-center basis-1/4'></div>
                            <div className='flex items-center justify-center basis-1/4'>
                                <p className='font-semibold'>${originalTotalPrice} </p>
                            </div>
                        </div>
                        <div className='flex border-slate-200 py-5 border-t'>
                            <div className="flex items-center basis-1/3">
                                <span className="text-base font-semibold">DISCOUNT</span>
                            </div>
                            <div className='flex items-center justify-center basis-1/4'></div>
                            <div className='flex items-center justify-center basis-1/4'>
                                <p className='font-semibold'>${originalTotalPrice - total} </p>
                            </div>
                        </div>
                        <div className='flex border-slate-200 py-5 border-t'>
                            <div className="flex items-center basis-1/3">
                                <span className="text-base font-semibold">TOTAL</span>
                            </div>
                            <div className='flex items-center justify-center basis-1/4'></div>
                            <div className='flex items-center justify-center basis-1/4'>
                                <p className='font-semibold'>${total} </p>
                            </div>
                        </div>
                    </div>
                </> : <p className='text-center pt-10 text-lg font-semibold'>Add order</p>}
                <div className="text-center mt-10">
                    <button type='submit' className="w-full bg-slate-900 text-white py-6 text-center">PLACE ORDER</button>
                </div>
            </form>
        </div>
    );
}

export default Checkout;