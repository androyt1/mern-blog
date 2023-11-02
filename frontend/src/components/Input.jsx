import PropTypes from 'prop-types'

const Input = ({
    type,
    name,
    id,
    value,
    handleChange,
    placeholder,
    className,
}) => {
    return (
        <input
            type={type}
            name={name}
            id={id}
            value={value}
            onChange={handleChange}
            placeholder={placeholder}
            className={`${className} p-2  w-full   rounded-md  placeholder-slate-800 shadow-md shadow-slate-850 text-slate-600 bg-slate-200 `}
        />
    )
}

Input.propTypes = {
    type: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    handleChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string.isRequired,
    className: PropTypes.string,
}

export default Input
