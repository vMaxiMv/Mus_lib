"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeTrackFromPlaylist = exports.addTrackToPlaylist = void 0;
const client_1 = require("@prisma/client");
const ApiError = require('../error/ApiError');
const prisma = new client_1.PrismaClient();
const addTrackToPlaylist = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { playlist_id, track_id } = req.body;
    if (!playlist_id || !track_id) {
        return next(ApiError.badRequest('Необходимо передать playlist_id и track_id'));
    }
    try {
        const playlistTrack = yield prisma.playlist_tracks.create({
            data: {
                playlist_id,
                track_id
            }
        });
        res.status(200).json({
            message: "Трек успешно добавлен в плейлист",
            playlistTrack
        });
    }
    catch (error) {
        console.error('Ошибка:', error);
        return next(ApiError.internal('Ошибка сервера при добавлении трека в плейлист'));
    }
});
exports.addTrackToPlaylist = addTrackToPlaylist;
const removeTrackFromPlaylist = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { playlist_id, track_id } = req.body;
    if (!playlist_id || !track_id) {
        return next(ApiError.badRequest('Необходимо передать playlist_id и track_id'));
    }
    try {
        const deletedTrack = yield prisma.playlist_tracks.deleteMany({
            where: {
                playlist_id,
                track_id,
            },
        });
        if (deletedTrack.count === 0) {
            return next(ApiError.notFound('Трек не найден в указанном плейлисте'));
        }
        res.status(200).json({
            message: 'Трек успешно удален из плейлиста',
            deletedTrack,
        });
    }
    catch (error) {
        console.error('Ошибка:', error);
        return next(ApiError.internal('Ошибка сервера при удалении трека из плейлиста'));
    }
});
exports.removeTrackFromPlaylist = removeTrackFromPlaylist;
