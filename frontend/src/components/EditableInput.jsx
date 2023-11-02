import PropTypes from 'prop-types'
import Input from './Input'
import Paragraph from './Paragraphs'

const EditableInput = ({
    mode,
    value,
    handleChange,
    type,
    id,
    name,
    placeholder,

    display,
}) => {
    return (
        <div className='w-full relative overflow-hidden '>
            <Paragraph>
                <span className='font-semibold capitalize text-slate-700'>
                    {name}{' '}
                </span>
                {display}
            </Paragraph>
            <div
                className={`absolute left top-0 w-full  h-full bg-white duration-300  transition-transform ease-in ${
                    mode ? 'translate-y-0' : 'translate-y-[500%]'
                }`}
            >
                <Input
                    type={type}
                    id={id}
                    name={name}
                    placeholder={placeholder}
                    value={value}
                    handleChange={handleChange}
                />
            </div>
        </div>
    )
}

EditableInput.propTypes = {
    mode: PropTypes.bool.isRequired,
    type: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    handleChange: PropTypes.func.isRequired,

    display: PropTypes.string.isRequired,
}

export default EditableInput
