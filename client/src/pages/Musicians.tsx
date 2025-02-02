import MusiciansList from '../components/musicians/MusiciansList'
import { useGetMusiciansQuery } from '../api/musicianApi'

const Musicians = () => {
   const {data: musicians} = useGetMusiciansQuery()
    return (
        <div>
        {musicians && <MusiciansList musicians={musicians}/>}
        </div>
    )
}

export default Musicians