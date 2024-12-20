"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const playlistTracksController_1 = require("../controllers/playlistTracksController");
const router = (0, express_1.Router)();
router.post('/addTrack', playlistTracksController_1.addTrackToPlaylist);
router.delete('/removeTrack', playlistTracksController_1.removeTrackFromPlaylist);
module.exports = router;
