import Genres from "./pages/Genres";
import Musicians from "./pages/Musicians";
import PlaylistDetailsPage from "./pages/PlaylistDetailsPage";
import Playlists from "./pages/Playlists";
import Preview from "./pages/Preview";
import TrackDetailsPage from "./pages/TrackDetailsPage";

import Tracks from "./pages/Tracks";

export const musRoutes = [
    {
        path: '/',
        Component: Preview
    },
    {
        path: '/tracks',
        Component: Tracks
    },
    {
        path: '/genres',
        Component: Genres
    },
    {
        path: '/tracks/:id',
        Component: TrackDetailsPage
    },
    {
        path: '/musicians',
        Component: Musicians
    },
    {
        path: '/playlists',
        Component: Playlists
    },
    {
        path: '/playlists/:id',
        Component: PlaylistDetailsPage
    },
        
]