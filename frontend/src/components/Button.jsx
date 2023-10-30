import PropTypes from 'prop-types'
const Button = ({ children, type, handleClick, className }) => {
    return (
        <button
            type={type}
            onClick={handleClick}
            className={`px-6 py-2 bg-slate-600 text-slate-50 rounded-md mt-4 ${className}`}
        >
            {children}
        </button>
    )
}
Button.propTypes = {
    children: PropTypes.node.isRequired,
    type: PropTypes.string,
    handleClick: PropTypes.func,
    className: PropTypes.string,
}
export default Button
