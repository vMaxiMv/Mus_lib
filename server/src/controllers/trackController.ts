import { PrismaClient } from "@prisma/client";
import { IQueryTypes } from "../interfaces/queryParams";
import { NextFunction, Request, Response } from "express";

const ApiError = require('../error/ApiError')
const prisma = new PrismaClient()

export const getTracks = async ({req, res, next}: IQueryTypes)=>{
    try {
        const tracks = await prisma.tracks.findMany();
        res.status(200).json(tracks)
    }
    catch(error){
        return next(ApiError.badRequest('Ошибка'))
    }
}

export const getTrackById = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params; 

    try {
        const track = await prisma.tracks.findUnique({
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
    } catch (error) {
        console.error("Ошибка при получении трека:", error);
        return next(ApiError.internal("Ошибка сервера при получении трека"));
    }
};

export const createTracks = async (req: Request, res: Response, next: NextFunction) => {
    const {title, duration, musician_id} = req.body
    if(!title || !duration || !musician_id){
        return next(ApiError.badRequest('Отсутствуют обязательные данные'))
    }
    try {
        const newMusician = await prisma.tracks.create({
            data:{
                title,
                duration,
                musician_id
            }
        })
        res.status(200).json(newMusician)
    }
    catch (error){
        return next(ApiError.internal('Ошибка сервера при создании трека'))
    }
}