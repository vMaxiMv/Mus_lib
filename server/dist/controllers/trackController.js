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
exports.deleteTracks = exports.updateTrack = exports.createTracks = exports.getTrackById = exports.getTracks = void 0;
const client_1 = require("@prisma/client");
const ApiError = require('../error/ApiError');
const prisma = new client_1.PrismaClient();
const getTracks = (_a) => __awaiter(void 0, [_a], void 0, function* ({ req, res, next }) {
    try {
        const tracks = yield prisma.tracks.findMany();
        res.status(200).json(tracks);
    }
    catch (error) {
        return next(ApiError.badRequest('Ошибка'));
    }
});
exports.getTracks = getTracks;
const getTrackById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const track = yield prisma.tracks.findUnique({
            where: { track_id: id },
            include: {
                musician: true,
                albums: true,
                track_genres: {
                    include: {
                        genres: true,
                    },
                },
            },
        });
        if (!track) {
            return next(ApiError.badRequest("Трек не найден"));
        }
        const formattedTrack = {
            track_id: track.track_id,
            title: track.title,
            duration: track.duration,
            musician: track.musician ? {
                musician_id: track.musician.musician_id,
                name: track.musician.name,
                country: track.musician.country,
            } : null,
            album: track.albums ? {
                album_id: track.albums.album_id,
                title: track.albums.title,
                release_year: track.albums.release_year,
                cover_image_url: track.albums.cover_image_url,
            } : null,
            genres: track.track_genres.map((tg) => ({
                genre_id: tg.genres.genre_id,
                genre_name: tg.genres.genre_name,
            })),
        };
        res.status(200).json(formattedTrack); // Отправляем форматированный ответ
    }
    catch (error) {
        console.error("Ошибка при получении трека:", error);
        return next(ApiError.internal("Ошибка сервера при получении трека"));
    }
});
exports.getTrackById = getTrackById;
const createTracks = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, duration, musician_id, genres } = req.body;
    if (!title || !duration || !musician_id || !Array.isArray(genres)) {
        return next(ApiError.badRequest('Отсутствуют обязательные данные'));
    }
    try {
        const newTrack = yield prisma.tracks.create({
            data: {
                title,
                duration,
                musician_id,
                track_genres: {
                    create: genres.map((genre_id) => ({
                        genre_id,
                    })),
                },
            },
            include: {
                track_genres: true,
            },
        });
        res.status(201).json(newTrack);
    }
    catch (error) {
        console.error("Ошибка при создании трека:", error);
        return next(ApiError.internal('Ошибка сервера при создании трека'));
    }
});
exports.createTracks = createTracks;
const updateTrack = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, duration, musician_id, album_id, genres } = req.body; // genres - массив genre_id
    const { id } = req.params; // id - идентификатор трека
    if (!id) {
        return next(ApiError.badRequest("ID трека не указан в URL"));
    }
    if (!title || !musician_id || !genres || !Array.isArray(genres)) {
        return next(ApiError.badRequest("Отсутствуют обязательные данные"));
    }
    try {
        const existingTrack = yield prisma.tracks.findUnique({
            where: { track_id: id },
        });
        if (!existingTrack) {
            return next(ApiError.notFound("Трек не найден"));
        }
        const updatedTrack = yield prisma.tracks.update({
            where: { track_id: id },
            data: {
                title,
                duration,
                musician_id,
                album_id
            },
        });
        yield prisma.track_genres.deleteMany({
            where: { track_id: id },
        });
        const genreData = genres.map((genre_id) => ({
            track_id: id,
            genre_id,
        }));
        yield prisma.track_genres.createMany({
            data: genreData,
        });
        res.status(200).json({
            message: "Трек успешно обновлен",
            updatedTrack,
        });
    }
    catch (error) {
        console.error("Ошибка при обновлении трека:", error);
        return next(ApiError.internal("Ошибка при обновлении трека"));
    }
});
exports.updateTrack = updateTrack;
const deleteTracks = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params; // Получаем ID трека из URL
    if (!id) {
        return next(ApiError.badRequest("ID трека не указан"));
    }
    try {
        yield prisma.$transaction((prisma) => __awaiter(void 0, void 0, void 0, function* () {
            yield prisma.track_genres.deleteMany({
                where: { track_id: id },
            });
            const deletedTrack = yield prisma.tracks.delete({
                where: { track_id: id },
            });
            return deletedTrack;
        }));
        res.status(200).json({ message: "Трек и его связи с жанрами успешно удалены" });
    }
    catch (error) {
        console.error("Ошибка при удалении трека:", error);
        return next(ApiError.internal("Ошибка сервера при удалении трека"));
    }
});
exports.deleteTracks = deleteTracks;
