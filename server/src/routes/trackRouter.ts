import {Router} from 'express'
import { createTracks, deleteTracks, getTrackById, getTracks, updateTrack } from '../controllers/trackController';
const router = Router();

router.post('/create', createTracks)
router.get('/', getTracks)
router.get('/:id', getTrackById)
router.patch('/update/:id', updateTrack)
router.delete('/delete/:id', deleteTracks)


module.exports = router;
export {}
