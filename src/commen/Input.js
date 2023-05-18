const Input = ({ lable, name, formik, placeholder, style, type = 'text' }) => {
    const styleCustom = style ? style : '';
    return (
        <div className={`flex flex-col mb-6  ${styleCustom}`}>
            <input
                type={type}
                {...formik.getFieldProps({ name })}
                name={name}
                placeholder={placeholder} />
            {lable && <label className="label-custom">{lable}</label>}
            {formik.errors[name] && formik.touched[name] && (<span className='text-red-600 text-sm'>{formik.errors[name]}</span>)}
        </div>
    );
}

export default Input;