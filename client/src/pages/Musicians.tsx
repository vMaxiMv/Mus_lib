import React, { useEffect, useState } from 'react'
import { IMusician } from '../interfaces/musicianInterfaces'
import { getMusiciansQuery } from '../api/musicianApi'
import MusiciansList from '../components/musicians/MusiciansList'

const Musicians = () => {
    const [musicians, setMusicians] = useState<IMusician[]>([])
    const getTracks = async () => {
        try {
            const data = await getMusiciansQuery()
            setMusicians(data)
        } catch (error) {
            console.error("Ошибка при получении данных о треках:", error);
        }
    }
    useEffect(() => {
        getTracks();
    }, []);
    return (
        <div>
            <MusiciansList musicians={musicians}/>
        </div>
    )
}

export default Musicians