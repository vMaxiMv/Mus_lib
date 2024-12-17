import {Router} from 'express'
import { getGenres } from '../controllers/genereController';

const router = Router();


router.get('/', getGenres)



module.exports = router;
export {}
