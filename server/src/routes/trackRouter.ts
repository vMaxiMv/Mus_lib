import {Router} from 'express'
import { createTracks, deleteTracks, getTrackById, getTracks } from '../controllers/trackController';
const router = Router();

router.post('/create', createTracks)
router.get('/', getTracks)
router.get('/:id', getTrackById)
router.patch('/:id')
router.delete('/:id', deleteTracks)


module.exports = router;
export {}
