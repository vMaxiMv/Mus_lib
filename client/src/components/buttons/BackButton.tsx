import { useNavigate } from "react-router-dom"
import '../../styles/global.css'


const BackButton = () => {
  const navigate = useNavigate()

  const handleGoBack = () => {
   navigate(-1) 
  }
    return (
        <div>
            <button className='back_button' onClick={()=>handleGoBack()}>Назад</button>
        </div>
    )
}

export default BackButton