import PropTypes from 'prop-types'

const EditableImage = ({ mode, handleChange, type, name, id, className }) => {
    return (
        <div className='w-full relative overflow-hidden'>
            <div className='h-10 w-full'></div>
            <div
                className={`absolute left top-0 w-full  h-full bg-slate-600 duration-300  transition-transform ease-in ${
                    mode ? 'translate-y-0' : 'translate-y-[95%]'
                }`}
            >
                <input
                    type={type}
                    name={name}
                    id={id}
                    className={`${className} p-2 w-full md:w-[70%] bg-slate-600 rounded-md  placeholder-slate-300 shadow-md shadow-slate-850 text-white`}
                    onChange={handleChange}
                />
            </div>
        </div>
    )
}

EditableImage.propTypes = {
    mode: PropTypes.bool.isRequired,
    type: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.object.isRequired,
    className: PropTypes.string.isRequired,
    handleChange: PropTypes.func.isRequired,
}

export default EditableImage
