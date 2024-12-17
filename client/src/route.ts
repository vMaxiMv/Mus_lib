import Genres from "./pages/Genres";
import Preview from "./pages/Preview";
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
]