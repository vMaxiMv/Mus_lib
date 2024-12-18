import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ITrackDetails } from '../../../interfaces/tracksInterfaces'
import { getTracksDetailQuery } from '../../../api/tracksApi'
import css from './tracksDetails.module.css'
import { Spin } from 'antd'



const TracksDetails = () => {
    const { id} = useParams<{id:string}>()
    const [trackInfo, setTrackInfo] = useState<ITrackDetails | null>(null)

    const getTrackDetail = async () => {
        if (!id) {
            console.error("ID трека не указан в URL");
            return;
        }
          try {
              const data = await getTracksDetailQuery(id)
              setTrackInfo(data)
          } catch (error) {
              console.error("Ошибка при получении данных о растениях:", error);
          }
      }
       useEffect(() => {
            getTrackDetail()
          }, [id]);
          if (!trackInfo) {
            return <div style={{display:'flex', justifyContent:'center', alignItems:'center', height: '100vh'}}><Spin/></div>;
        }
    
    return (
        <div className={css.cardContainer}>
        <div className={css.card}>
            <h2 className={css.cardTitle}>{trackInfo.title}</h2>

            <div className={css.cardSection}>
                <p className={css.cardText}>Длительность: {trackInfo.duration}</p>
            </div>

            <div className={css.cardSection}>
                <p className={css.cardText}>Музыкант: {trackInfo.musician.name}</p>
            </div>

            {trackInfo.album && (
                <div className={css.cardSection}>
                    <p className={css.cardText}>Альбом: {trackInfo.album.title}</p>
                    <p className={css.cardText}>Год выпуска: {trackInfo.album.release_year}</p>
                </div>
            )}

            <div className={css.cardSection}>
                <p className={css.cardText}>Жанры:</p>
                <ul className={css.cardGenres}>
                    {trackInfo.genres.map((genre) => (
                        <li key={genre.genre_id} className={css.genreItem}>
                            {genre.genre_name}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    </div>
    )
}

export default TracksDetails