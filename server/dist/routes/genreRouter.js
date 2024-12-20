"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const genereController_1 = require("../controllers/genereController");
const router = (0, express_1.Router)();
router.get('/', genereController_1.getGenres);
module.exports = router;
