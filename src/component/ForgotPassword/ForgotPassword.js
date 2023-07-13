import { useFormik } from "formik";
import Input from "../../commen/Input";
import * as Yup from 'yup';
import { forgotPasswordUser } from "../../services/forgotPasswordService";
import { toast } from "react-toastify";
const initialValues = {
    email: ''
}
const validationSchema = Yup.object({
    email: Yup.string().email('Eamil invail format').required('Email is required')
})

const ForgotPassword = ({ changeForm }) => {
    const onSubmit = async (values) => {
        try {
            const { data } = await forgotPasswordUser(values)
            toast.success('send')
        } catch (error) {
            if (error.response && error.response.data.message) {
                toast.error(error.response.data.message)
            }
        }
    }
    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: validationSchema,
        onSubmit
    })
    return (
        <>
            <form onSubmit={formik.handleSubmit} className="md:w-2/5 mx-auto">
                <Input type="text" name='email' lable='Email' formik={formik} />
                <button type='submit' className="w-full bg-slate-900 text-white py-6 text-center">Reset password</button>
            </form>
            <div className="text-center mt-10 mb-5">
                <button type="button" onClick={changeForm} className="text-slate-900 font-semibold border-b-2 border-slate-900 py-2">
                    Login
                </button>
            </div>
        </>
    );
}

export default ForgotPassword;