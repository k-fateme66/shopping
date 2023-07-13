import { useFormik } from "formik";
import { useEffect } from "react";
import { useState } from "react";
import * as Yup from 'yup'
import Input from "../../commen/Input";
import { transtionInptForm } from '../../assets/js/script'
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { loginUser } from "../../services/loginService";
import { toast } from "react-toastify";
import { useAuthActions } from "../../Context/AuthProvider";
const initialValues = {
    email: '',
    password: ''
}

const validationSchema = Yup.object({
    email: Yup.string().email('Eamil invail format').required('Email is required'),
    password: Yup.string().required('password is required').min(6, 'Password length is 8 caracters')
})




const Login = ({ changeForm }) => {
    let [searchParams, setSearchParams] = useSearchParams();
    const redirect = searchParams.get('redirect') ? `#` + searchParams.get('redirect') : '/';
    const navigate = useNavigate();
    const setAuth = useAuthActions();

    const onSubmit = async (values) => {
        try {
            const { data } = await loginUser(values);
            setAuth(data);
            toast.success('Login')
            navigate(redirect)
        } catch (error) {
            if (error.response && error.response.data.message) {
                toast.error(error.response.data.message)
            }
        }
    }

    useEffect(() => {
        // transtionInptForm()
    }, [])

    const formik = useFormik({
        initialValues,
        validationSchema,
        validateOnMount: true,
        enableReinitialize: true,
        onSubmit
    })

    return (
        <>
            <form onSubmit={formik.handleSubmit} className="md:w-2/5 mx-auto">
                <Input type='text' lable='Email' name='email' formik={formik} />
                <Input type='password' lable='Password' name='password' formik={formik} />
                <button type='submit' className="w-full bg-slate-900 text-white md:py-6 py-4 text-center">LOGIN</button>
            </form>
            <div className="text-center mt-10 mb-5">
                <button type="button" onClick={changeForm} className="text-slate-900 font-semibold border-b-2 border-slate-900 py-2">
                    Lost your password?
                </button>
            </div>
        </>
    );
}

export default Login;