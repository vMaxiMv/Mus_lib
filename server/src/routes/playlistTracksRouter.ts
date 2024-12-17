import {Router} from 'express'
import { addTrackToPlaylist, removeTrackFromPlaylist } from '../controllers/playlistTracksController';


const router = Router();

router.post('/addTrack', addTrackToPlaylist)
router.delete('/removeTrack', removeTrackFromPlaylist)


module.exports = router;
export {}
