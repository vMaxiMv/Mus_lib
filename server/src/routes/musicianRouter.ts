import {Router} from 'express'
import { createMusicians, deleteMusicians, getMusicians, getMusiciansById, updateMusicians } from '../controllers/musicianController';

const router = Router();

router.post('/create', createMusicians)
router.get('/:id', getMusiciansById )
router.get('/', getMusicians)
router.patch('/update', updateMusicians)
router.delete('/delete/:id', deleteMusicians)


module.exports = router;
export {}
