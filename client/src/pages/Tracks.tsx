import React, { useEffect, useState } from 'react'
import { useGetTracksQuery } from '../api/tracksApi'

import TracksList from '../components/tracks/TracksList';

const Tracks = () => {
    const {data: tracks} = useGetTracksQuery()
    return (
        <div>
          {tracks && <TracksList tracks={tracks}/>}
        </div>
    )
}

export default Tracks