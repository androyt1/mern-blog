import PropTypes from 'prop-types'

const Paragraph = ({ children, className }) => {
    return (
        <div className='p-2 text-slate-800 max-w-[80%]'>
            <p className={`${className}`}>{children}</p>
        </div>
    )
}

Paragraph.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
}

export default Paragraph
