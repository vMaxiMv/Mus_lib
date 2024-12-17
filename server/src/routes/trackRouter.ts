import {Router} from 'express'
import { getTracks } from '../controllers/trackController';
const router = Router();

router.post('/')
router.get('/', getTracks)
router.patch('/:id')
router.delete('/:id')


module.exports = router;
export {}
