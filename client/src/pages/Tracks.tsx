import React, { useEffect, useState } from 'react'
import { useGetTracksQuery } from '../api/tracksApi'

import { ITracks } from '../interfaces/tracksInterfaces'
import TracksList from '../components/tracks/TracksList';

type TracksResponse = ITracks[];

const Tracks = () => {
    const {data: tracks, isLoading, error} = useGetTracksQuery()
    return (
        <div>
            <TracksList tracks={tracks || []}/>
        </div>
    )
}

export default Tracks