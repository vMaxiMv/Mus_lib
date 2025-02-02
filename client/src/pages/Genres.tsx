import {useGetGenresQuery } from '../api/genresApi'
import GenresList from '../components/genres/genreList'
const Genres = () => {
    const {data: genres} = useGetGenresQuery()
    return (
        <div>
            {genres && <GenresList genres={genres}/>}
        </div>
    )
}

export default Genres