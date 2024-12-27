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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePlaylists = exports.createPlaylists = exports.getPlaylistById = exports.getPlaylists = void 0;
const client_1 = require("@prisma/client");
const fs_1 = __importDefault(require("fs"));
const ApiError = require('../error/ApiError');
const uuid = require('uuid');
const path = require('path');
const prisma = new client_1.PrismaClient();
const getPlaylists = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const playlists = yield prisma.playlists.findMany();
        const baseUrl = `${req.protocol}://${req.get("host")}/static/`;
        console.log('baseUrl:', baseUrl); // Логируем полученные данные
        const updatedPlaylists = playlists.map(playlist => {
            if (playlist.cover_image_url && !playlist.cover_image_url.startsWith('http')) {
                playlist.cover_image_url = `${baseUrl}${playlist.cover_image_url}`;
            }
            return playlist;
        });
        console.log('Updated Playlists:', updatedPlaylists); // Логируем обновленные данные
        res.status(200).json(updatedPlaylists);
    }
    catch (error) {
        console.error('Error fetching playlists:', error); // Логируем ошибку
        return next(ApiError.badRequest('Ошибка при получении плейлистов'));
    }
});
exports.getPlaylists = getPlaylists;
const getPlaylistById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        if (!id) {
            return next(ApiError.badRequest("Не указан ID плейлиста"));
        }
        const playlist = yield prisma.playlists.findUnique({
            where: { playlist_id: id },
            include: {
                playlist_tracks: {
                    include: {
                        tracks: true,
                    },
                },
            },
        });
        if (!playlist) {
            return next(ApiError.notFound("Плейлист не найден"));
        }
        const baseUrl = `${req.protocol}://${req.get("host")}/static/`;
        if (playlist.cover_image_url && !playlist.cover_image_url.startsWith("http")) {
            playlist.cover_image_url = `${baseUrl}${playlist.cover_image_url}`;
        }
        const formattedPlaylist = {
            playlist_id: playlist.playlist_id,
            name: playlist.name,
            description: playlist.description,
            cover_image_url: playlist.cover_image_url,
            created_at: playlist.created_at,
            updated_at: playlist.updated_at,
            tracks: playlist.playlist_tracks.map(pt => ({
                track_id: pt.tracks.track_id,
                title: pt.tracks.title,
                duration: pt.tracks.duration,
            })),
        };
        res.status(200).json(formattedPlaylist);
    }
    catch (error) {
        return next(ApiError.badRequest("Ошибка при получении плейлиста"));
    }
});
exports.getPlaylistById = getPlaylistById;
const createPlaylists = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { name, description } = req.body;
    if (!req.files || !req.files.cover_image_url) {
        console.log('Файл не был передан или неправильное имя поля');
        return next(ApiError.badRequest('Файл обложки не передан.'));
    }
    const coverImageFile = (_a = req.files) === null || _a === void 0 ? void 0 : _a.cover_image_url;
    const fileName = `${uuid.v4()}.jpg`;
    const staticDir = path.resolve(process.cwd(), 'src/static');
    coverImageFile.mv(path.resolve(staticDir, fileName));
    if (!fs_1.default.existsSync(staticDir)) {
        fs_1.default.mkdirSync(staticDir, { recursive: true });
    }
    console.log('path.resolve', path.resolve(staticDir, fileName));
    if (!name || !description) {
        return next(ApiError.badRequest('Отсутствуют обязательные данные'));
    }
    try {
        const newPlaylist = yield prisma.playlists.create({
            data: {
                name,
                description,
                cover_image_url: fileName
            }
        });
        res.status(200).json(newPlaylist);
    }
    catch (error) {
        console.error('Ошибка при создании плейлиста:', error);
        return next(ApiError.internal('Ошибка сервера при создании исполнителя'));
    }
});
exports.createPlaylists = createPlaylists;
// export const updateMusicians = async (req: Request, res: Response, next: NextFunction) => {
//     const {musician_id, name, birth_date, country} = req.body
//     //const {id} = req.params
//     if(!musician_id || !name || !birth_date || !country){
//         return next(ApiError.badRequest('Отсутствуют обязательные данные'))
//     }
//     try {
//         const updatedMusician = await prisma.musician.update({
//             where: {musician_id: musician_id},
//             data: {musician_id, name, birth_date, country}
//         })
//         res.status(200).json({message: 'Музыкант успешно обновлен', updatedMusician})
//     } catch (error){
//         return next(ApiError.badRequest('Ошибка при обновлении музыканта'))
//     }
// }
const deletePlaylists = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const playlist = yield prisma.playlists.findUnique({
            where: { playlist_id: String(id) },
        });
        if (!playlist) {
            return next(ApiError.notFound('Плейлист не найден'));
        }
        const staticDir = path.resolve(process.cwd(), 'src/static');
        const filePath = path.resolve(staticDir, playlist.cover_image_url);
        if (fs_1.default.existsSync(filePath)) {
            fs_1.default.unlinkSync(filePath);
        }
        else {
            console.warn(`Файл обложки "${playlist.cover_image_url}" не найден`);
        }
        const deletedPlaylist = yield prisma.playlists.delete({
            where: { playlist_id: String(id) }
        });
        res.status(200).json({ message: 'Плейлист успешно удален', deletedPlaylist });
    }
    catch (error) {
        return next(ApiError.badRequest('Ошибка при удалении плейлиста'));
    }
});
exports.deletePlaylists = deletePlaylists;
// export const addTrackToPlaylist = async (req: Request, res: Response, next: NextFunction) => {
//   const { playlist_id, track_id } = req.body;
//   if (!playlist_id || !track_id) {
//     return res.status(400).json({ message: "Необходимо передать playlist_id и track_id" });
//   }
//   try {
//     const playlistTrack = await prisma.playlist_tracks.create({
//       data: {
//         playlist_id,
//         track_id
//       }
//     });
//     res.status(200).json({
//       message: "Трек успешно добавлен в плейлист",
//       playlistTrack
//     });
//   } catch (error) {
//     console.error('Ошибка:', error); 
//     return next(ApiError.internal('Ошибка сервера при добавлении трека в плейлист'))
//   }
// };
