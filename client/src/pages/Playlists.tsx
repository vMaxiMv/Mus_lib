import PlaylistsCollection from "../components/playlists/playlistsCollection"
import { useGetPlaylistsQuery } from "../api/playlistApi"


const Playlists = () => {
    const {data: playlists} = useGetPlaylistsQuery()


    return (
        <div>
           {playlists && <PlaylistsCollection playlists={playlists}/>}
        </div>
    )
}

export default Playlists