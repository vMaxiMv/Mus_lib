"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const playlistController_1 = require("../controllers/playlistController");
const router = (0, express_1.Router)();
router.post('/create', playlistController_1.createPlaylists);
router.get('/', playlistController_1.getPlaylists);
router.patch('/:id');
router.delete('/delete/:id', playlistController_1.deletePlaylists);
//router.post('/addTrack', addTrackToPlaylist)
module.exports = router;