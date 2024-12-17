import { PrismaClient } from "@prisma/client";
import { IQueryTypes } from "../interfaces/queryParams";
import { NextFunction, Request, Response } from "express";
import { UploadedFile } from "express-fileupload";
import fs from 'fs';

const ApiError = require('../error/ApiError')
const uuid = require('uuid')
const path = require('path')
const prisma = new PrismaClient()



export const getPlaylists = async ({req, res, next}: IQueryTypes)=>{
    try {
        const playlists = await prisma.playlists.findMany();
        res.status(200).json(playlists)
    }
    catch(error){
        return next(ApiError.badRequest('Ошибка'))
    }
}

export const createPlaylists = async (req: Request, res: Response, next: NextFunction) => {
    const {name, description} = req.body

    if (!req.files || !req.files.cover_image_url) {
        console.log('Файл не был передан или неправильное имя поля');
        return next(ApiError.badRequest('Файл обложки не передан.'));
    }

    const coverImageFile = req.files?.cover_image_url as UploadedFile;
    const fileName = `${uuid.v4()}.jpg`;
    const staticDir = path.resolve(__dirname, '..', 'static')
    coverImageFile.mv(path.resolve(staticDir, fileName))

    if (!fs.existsSync(staticDir)) {
        fs.mkdirSync(staticDir, { recursive: true });
    }

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
