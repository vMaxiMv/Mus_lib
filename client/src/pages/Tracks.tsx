import React, { useEffect, useState } from 'react'
import { getTracksQuery } from '../api/tracksApi'

import { ITracks } from '../interfaces/tracksInterfaces'
import TracksList from '../components/tracks/TracksList';

type TracksResponse = ITracks[];

const Tracks = () => {
    const [tracks, setTracks] = useState<TracksResponse>([])
    const getTracks = async () => {
        try {
            const data = await getTracksQuery()
            setTracks(data)
        } catch (error) {
            console.error("Ошибка при получении данных о растениях:", error);
        }
    }
    useEffect(() => {
        getTracks();
    }, []);
    return (
        <div>
            <TracksList tracks={tracks}/>
        </div>
    )
}

export default Tracks