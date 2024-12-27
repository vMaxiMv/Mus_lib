import { useEffect, useState } from "react"
import { getPlaylistsQuery } from "../api/playlistApi"
import PlaylistsCollection from "../components/playlists/playlistsCollection"
import { IPlayList } from "../interfaces/playlistInterface"

type PlaylistResponse = IPlayList[]

const Playlists = () => {
    const [playlists, setPlaylists] = useState<PlaylistResponse>([])
 const getPlaylists = async () => {
        try {
            const data = await getPlaylistsQuery()
            setPlaylists(data)
        } catch (error) {
            console.error("Ошибка при получении данных о треках:", error);
        }
    }
    useEffect(() => {
        getPlaylists();
    }, []);

    

    return (
        <div>
            <PlaylistsCollection playlists={playlists} onRefreshPlaylists={getPlaylists}/>
        </div>
    )
}

export default Playlists