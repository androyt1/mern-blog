// import { Header } from '../components/Header'
import { useProfile } from '../hooks/useprofile'
import Button from '../components/Button'
import EditableInput from '../components/EditableInput'
import Loading from '../components/Loading'
import EditableImage from '../components/EditableImage'

const DashBoard = () => {
    const {
        user,
        edit,
        toggleMode,
        handleChange,
        cancelEdit,
        handleSubmit,
        loading,
    } = useProfile()
    const { firstname, lastname, email, mode, avatar } = edit
    return (
        <div className='h-screen  bg-white col-span-6 md:col-span-5 md:overflow-hidden '>
            <div className='h-[10%] flex justify-center items-center md:items-end'>
                <h3 className='text-xl font-semibold text-center text-slate-800 md:text-3xl'>
                    {mode ? 'Update Profile' : 'User Profile'}
                </h3>
            </div>
            <div className='w-full h-full block md:flex'>
                <div className='h-[50%] flex justify-center items-end md:flex-1 md:h-full md:justify-center md:items-center md:bg-white md:px-10'>
                    <img
                        src={user?.avatar}
                        alt=''
                        className='h-full w-full object-cover '
                    />
                </div>

                <div className='h-[40%]  w-full  space-y-3 pt-6 p-3  relative bg-white md:flex-1 md:h-full md:flex flex-col md:gap-y-4 justify-center items-start md:px-10'>
                    <EditableImage
                        type='file'
                        id='avatar'
                        name='avatar'
                        mode={mode}
                        value={avatar}
                        handleChange={handleChange}
                        className=''
                    />

                    <EditableInput
                        type='text'
                        id='firstname'
                        name='firstname'
                        placeholder='Enter FirstName'
                        mode={mode}
                        value={firstname}
                        handleChange={handleChange}
                        user={user}
                        display={user?.firstname}
                    />

                    <EditableInput
                        type='text'
                        id='lastname'
                        name='lastname'
                        placeholder='Enter LastName'
                        mode={mode}
                        value={lastname}
                        handleChange={handleChange}
                        user={user}
                        display={user?.lastname}
                    />

                    <EditableInput
                        type='email'
                        id='email'
                        name='email'
                        placeholder='Enter Email Address'
                        mode={mode}
                        value={email}
                        handleChange={handleChange}
                        user={user}
                        display={user?.email}
                    />

                    <div className='w-full   flex justify-between items-center relative overflow-hidden '>
                        <Button
                            type='button'
                            className='w-[30%] md:w-[30%] mt-3 !md:mt-6 !p-2'
                            handleClick={mode ? cancelEdit : toggleMode}
                        >
                            {mode ? 'cancel' : 'Edit'}
                        </Button>
                        <Button
                            type='button'
                            className={`w-[30%] md:w-[30%] mt-3 !md:mt-6 !p-2 duration-300 transition-transform ease-in !text-slate-800 !bg-slate-300  ${
                                mode ? 'translate-y-0' : 'translate-y-[300%]'
                            }`}
                            handleClick={handleSubmit}
                        >
                            Save
                        </Button>
                    </div>
                    {loading && <Loading />}
                </div>
            </div>
        </div>
    )
}

DashBoard.propTypes = {}

export default DashBoard
