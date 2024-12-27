import {Router} from 'express'
import {createPlaylists, deletePlaylists, getPlaylistById, getPlaylists } from '../controllers/playlistController';

const router = Router();

router.post('/create', createPlaylists)
router.get('/', getPlaylists)
router.get('/:id', getPlaylistById)
router.patch('/:id')
router.delete('/delete/:id', deletePlaylists)




module.exports = router;
export {}
