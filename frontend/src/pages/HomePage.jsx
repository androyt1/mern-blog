import { Header } from '../components/Header'
import Paragraph from '../components/Paragraphs'

const HomePage = () => {
    return (
        <div className='col-span-5 h-screen bg-slate-800'>
            <div className=' w-full h-[50%] bg-center bg-cover bg-bgimg'></div>
            <Header text='Home Page' />
            <Paragraph>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Unde
                perspiciatis officia quo atque molestias, illo harum facilis
                laudantium! Temporibus voluptatibus quo quisquam doloremque enim
                porro qui culpa numquam. Tempore, laboriosam.
            </Paragraph>
            <Paragraph>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto,
                aperiam molestias. Animi qui repudiandae ab ex quasi ut maiores
                aliquam doloremque saepe. Sit nostrum fugiat aperiam animi saepe
                facilis tenetur obcaecati iste dolorem inventore error accusamus
                repellendus non architecto nesciunt tempore aliquam, debitis
                ducimus nihil autem provident! Quod, quia ullam!
            </Paragraph>
            <Paragraph>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim
                blanditiis exercitationem reiciendis, itaque aut veritatis quam
                repellat animi est obcaecati corporis corrupti maiores harum
                facere natus magnam quidem, cum distinctio eaque veniam cumque
                nulla optio! Magni unde minus inventore nisi.
            </Paragraph>
        </div>
    )
}

export default HomePage
