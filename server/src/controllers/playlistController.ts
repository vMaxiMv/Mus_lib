import { PrismaClient } from "@prisma/client";
import { IQueryTypes } from "../interfaces/queryParams";
import { NextFunction, Request, Response } from "express";
import { UploadedFile } from "express-fileupload";
import fs from 'fs';

const ApiError = require('../error/ApiError')
const uuid = require('uuid')
const path = require('path')
const prisma = new PrismaClient()



export const getPlaylists = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const playlists = await prisma.playlists.findMany();
    

        const baseUrl = `${req.protocol}://${req.get("host")}/static/`;
        console.log('baseUrl:', baseUrl);  // Логируем полученные данные
        const updatedPlaylists = playlists.map(playlist => {
            if (playlist.cover_image_url && !playlist.cover_image_url.startsWith('http')) {
                playlist.cover_image_url = `${baseUrl}${path.basename(playlist.cover_image_url)}`;
            }
            return playlist;
        });
        console.log('Updated Playlists:', updatedPlaylists);  // Логируем обновленные данные

        res.status(200).json(updatedPlaylists);
    } catch (error) {
        console.error('Error fetching playlists:', error);  // Логируем ошибку
        return next(ApiError.badRequest('Ошибка при получении плейлистов'));
    }
};

  

  export const getPlaylistById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;

        if (!id) {
            return next(ApiError.badRequest("Не указан ID плейлиста"));
        }

        const playlist = await prisma.playlists.findUnique({
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
            playlist.cover_image_url = `${baseUrl}${path.basename(playlist.cover_image_url)}`;
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
    } catch (error) {
        return next(ApiError.badRequest("Ошибка при получении плейлиста"));
    }
};

export const createPlaylists = async (req: Request, res: Response, next: NextFunction) => {
    const {name, description} = req.body

    if (!req.files || !req.files.cover_image_url) {
        console.log('Файл не был передан или неправильное имя поля');
        return next(ApiError.badRequest('Файл обложки не передан.'));
    }

    const coverImageFile = req.files?.cover_image_url as UploadedFile;
    const fileName = `${uuid.v4()}.jpg`;
    const staticDir =
        process.env.NODE_ENV === 'production'
            ? path.resolve(process.cwd(), 'dist/static')
            : path.resolve(process.cwd(), 'src/static');

    coverImageFile.mv(path.resolve(staticDir, fileName))

    if (!fs.existsSync(staticDir)) {
        fs.mkdirSync(staticDir, { recursive: true });
    }
    console.log('path.resolve',path.resolve(staticDir, fileName))
    if(!name || !description){
        return next(ApiError.badRequest('Отсутствуют обязательные данные'))
    }
    try {
        const newPlaylist = await prisma.playlists.create({
            data:{
                name,
                description,
                cover_image_url: fileName
            }
        })
        res.status(200).json(newPlaylist)
    }
    catch (error){
        console.error('Ошибка при создании плейлиста:', error); 
        return next(ApiError.internal('Ошибка сервера при создании исполнителя'))
    }
}

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

export const deletePlaylists = async (req: Request, res: Response, next: NextFunction) => {
    const {id} = req.params
    try {
        const playlist = await prisma.playlists.findUnique({
            where: { playlist_id: String(id) },
        });

        if (!playlist) {
            return next(ApiError.notFound('Плейлист не найден'));
        }

        const staticDir =
            process.env.NODE_ENV === 'production'
                ? path.resolve(process.cwd(), 'dist/static')
                : path.resolve(process.cwd(), 'src/static');
        const filePath = path.resolve(staticDir, playlist.cover_image_url);

        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        } else {
            console.warn(`Файл обложки "${playlist.cover_image_url}" не найден`);
        }


        const deletedPlaylist = await prisma.playlists.delete({
            where: {playlist_id: String(id)}
        })
        
        res.status(200).json({message: 'Плейлист успешно удален', deletedPlaylist})
    } catch (error){
        return next(ApiError.badRequest('Ошибка при удалении плейлиста'))
    }
}



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
