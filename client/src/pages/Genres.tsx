import React, { useEffect, useState } from 'react'
import { IGenre } from '../interfaces/tracksInterfaces'
import { getGenresQuery } from '../api/genresApi'
import GenresList from '../components/genres/genreList'
const Genres = () => {
    const [genres, setGenres] = useState<IGenre[]>([])
    const getTracks = async () => {
        try {
            const data = await getGenresQuery()
            setGenres(data)
        } catch (error) {
            console.error("Ошибка при получении данных о треках:", error);
        }
    }
    useEffect(() => {
        getTracks();
    }, []);
    return (
        <div>
            <GenresList genres={genres}/>
        </div>
    )
}

export default Genres