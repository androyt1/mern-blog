import PropTypes from 'prop-types'

export const Header = ({ text, className }) => {
    return (
        <div className='text-2xl md:text-4xl text-center w-full flex justify-start items-center p-3 md:pt-10 pb-5 px-3 md:px-10 text-slate-200'>
            <h1 className={`${className}`}>{text}</h1>
        </div>
    )
}
Header.propTypes = {
    text: PropTypes.string.isRequired,
    className: PropTypes.string,
}
