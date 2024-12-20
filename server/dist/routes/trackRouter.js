"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const trackController_1 = require("../controllers/trackController");
const router = (0, express_1.Router)();
router.post('/create', trackController_1.createTracks);
router.get('/', trackController_1.getTracks);
router.get('/:id', trackController_1.getTrackById);
router.patch('/update/:id', trackController_1.updateTrack);
router.delete('/:id', trackController_1.deleteTracks);
module.exports = router;