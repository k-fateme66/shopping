const Textarea = ({ lable, name, formik, placeholder, style }) => {
    const styleCustom = style ? style : '';
    return (
        <div className={`flex flex-col mb-6  ${styleCustom}`}>
            <textarea
                {...formik.getFieldProps({ name })}
                name={name}
                placeholder={placeholder} ></textarea>
            {lable && <label className="label-custom">{lable}</label>}
            {formik.errors[name] && formik.touched[name] && (<span className='text-red-600 text-sm'>{formik.errors[name]}</span>)}
        </div>
    );
}

export default Textarea;