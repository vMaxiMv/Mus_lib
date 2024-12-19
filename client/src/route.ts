import Genres from "./pages/Genres";
import Musicians from "./pages/Musicians";
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
    }
        
]