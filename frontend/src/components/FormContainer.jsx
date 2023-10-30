import PropTypes from 'prop-types'

const FormContainer = ({ handleSubmit, children, className }) => {
    return (
        <form onSubmit={handleSubmit} className={className}>
            {children}
        </form>
    )
}
FormContainer.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    className: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
}
export default FormContainer
