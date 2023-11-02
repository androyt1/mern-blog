import PropTypes from 'prop-types'

const Button = ({ type, children, className, handleClick }) => {
    return (
        <button
            type={type}
            onClick={handleClick}
            className={`${className} p-2 md:p-3 w-full mt-3 md:mt-0  bg-slate-600 text-slate-100 font-semibold rounded-md md:rounded-xl placeholder-slate-300 shadow-sm shadow-slate-300  `}
        >
            {children}
        </button>
    )
}

Button.propTypes = {
    type: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    handleClick: PropTypes.func,
}

export default Button
