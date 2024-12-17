import {Router} from 'express'
import {createPlaylists, deletePlaylists, getPlaylists } from '../controllers/playlistController';

const router = Router();

router.post('/create', createPlaylists)
router.get('/', getPlaylists)
router.patch('/:id')
router.delete('/delete/:id', deletePlaylists)

//router.post('/addTrack', addTrackToPlaylist)


module.exports = router;
export {}
