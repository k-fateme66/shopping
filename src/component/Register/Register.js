import { useFormik } from "formik";
import Input from "../../commen/Input";
import * as Yup from 'yup'
import { useEffect, useState } from "react";
import { transtionInptForm } from "../../assets/js/script";
import { signupUser } from "../../services/signupService";
import { toast } from 'react-toastify';
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuthActions } from "../../Context/AuthProvider";

const initialValues = {
    email: '',
    password: '',
    name: '',
    phoneNumber: ''
}
const validationSchema = Yup.object({
    name: Yup.string().required('Name is requird').min(6, 'Name length is 6 caracters'),
    phoneNumber: Yup.string()
        .matches(
            /^[0-9]{11}$/,
            "Phone number is not valid"
        ),
    email: Yup.string().email('Eamil invail format').required('Email is required'),
    password: Yup.string().required('password is required').min(8, 'Password length is 8 caracters')
})


const Register = () => {
    let [searchParams, setSearchParams] = useSearchParams();
    const redirect = `#` + searchParams.get('redirect') || '/';
    const navigate = useNavigate();
    const setAuth = useAuthActions()
    const onSubmit = async (values) => {
        try {
            const { data } = await signupUser(values);
            setAuth(data);
            toast.success('login')
            navigate(redirect)
        } catch (error) {
            if (error.response && error.response.data.message) {
                toast.error(error)
            }
        }
    };

    useEffect(() => {
        // transtionInptForm()
    }, []);

    const formik = useFormik({
        initialValues,
        validationSchema,
        validateOnMount: true,
        enableReinitialize: true,
        onSubmit
    });

    return (
        <>
            <form onSubmit={formik.handleSubmit} className="md:w-2/5 mx-auto">
                <Input type="text" name='name' lable='Name' formik={formik} />
                <Input type="tel" name='phoneNumber' lable='Phone Number' formik={formik} />
                <Input type="email" name='email' lable='Email' formik={formik} />
                <Input type="password" name='password' lable='Password' formik={formik} />
                <button type='submit' className="w-full bg-slate-900 text-white md:py-6 py-4 text-center">REGISTER</button>
            </form>
        </>
    );
}

export default Register;