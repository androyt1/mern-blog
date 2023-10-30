import PropTypes from 'prop-types'

const Input = ({
    label,
    type,
    id,
    handleChange,
    placeholder,
    className,
    value,
    multiple,
    imageRef,
}) => {
    const inputType = type === 'file' ? 'file' : type
    const requiredType = type === 'file' ? false : true

    return (
        <div className='grid grid-cols-1 gap-y-2 w-full'>
            {label && (
                <div className='col-span-1 flex items-center'>
                    <label htmlFor={id}>
                        <span className='font-semibold'>{label}</span>
                    </label>
                </div>
            )}
            <input
                ref={imageRef}
                type={inputType}
                id={id}
                name={id}
                onChange={handleChange}
                placeholder={placeholder}
                className={`${className}`}
                value={value}
                required={requiredType}
                autoComplete='off'
                multiple={inputType === 'file' && multiple}
            />
        </div>
    )
}

Input.propTypes = {
    label: PropTypes.string,
    id: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['text', 'email', 'password', 'file']).isRequired,
    placeholder: PropTypes.string.isRequired,
    className: PropTypes.string.isRequired,
    handleChange: PropTypes.func.isRequired,
    value: PropTypes.string,
    multiple: PropTypes.bool,
    imageRef: PropTypes.object,
}

export default Input
