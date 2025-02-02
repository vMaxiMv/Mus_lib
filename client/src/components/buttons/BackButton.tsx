import { useNavigate } from "react-router-dom"



const BackButton = () => {
  const navigate = useNavigate()

  const handleGoBack = () => {
   navigate(-1) 
  }
    return (
        <div>
            <a style={{color:'white'}} onClick={()=>handleGoBack()}>Назад</a>
        </div>
    )
}

export default BackButton