import {Router} from 'express'
const router = Router();

const trackRouter = require('./trackRouter')
const musicianRouter = require('./musicianRouter')
const genreRouter = require('./genreRouter')
const playlistRouter = require('./playlistRouter')
const playlistTracksRouter = require('./playlistTracksRouter')




router.use('/track', trackRouter);
router.use('/musicians', musicianRouter);
router.use('/playlist', playlistRouter);
router.use('/genres', genreRouter);

router.use('/playlistTracks', playlistTracksRouter)


module.exports = router;
