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
    const { title, duration, musician_id, genres } = req.body;

    
    if (!title || !duration || !musician_id || !Array.isArray(genres)) {
        return next(ApiError.badRequest('Отсутствуют обязательные данные'));
    }

    try {
        const newTrack = await prisma.tracks.create({
            data: {
                title,
                duration,
                musician_id,
                track_genres: {
                    create: genres.map((genre_id: string) => ({
                        genre_id, 
                    })),
                },
            },
            include: {
                track_genres: true, 
            },
        });

        res.status(201).json(newTrack);
    } catch (error) {
        console.error("Ошибка при создании трека:", error);
        return next(ApiError.internal('Ошибка сервера при создании трека'));
    }
};


export const updateTrack = async (req: Request, res: Response, next: NextFunction) => {
  const { title, duration, musician_id, album_id, genres } = req.body; // genres - массив genre_id
  const { id } = req.params; // id - идентификатор трека

  if (!id) {
    return next(ApiError.badRequest("ID трека не указан в URL"));
  }

  if (!title || !musician_id || !genres || !Array.isArray(genres)) {
    return next(ApiError.badRequest("Отсутствуют обязательные данные"));
  }

  try {
    const existingTrack = await prisma.tracks.findUnique({
      where: { track_id: id },
    });

    if (!existingTrack) {
      return next(ApiError.notFound("Трек не найден"));
    }

    const updatedTrack = await prisma.tracks.update({
      where: { track_id: id },
      data: {
        title,
        duration,
        musician_id,
        album_id
      },
    });

    await prisma.track_genres.deleteMany({
      where: { track_id: id },
    });

    const genreData = genres.map((genre_id: string) => ({
      track_id: id,
      genre_id,
    }));

    await prisma.track_genres.createMany({
      data: genreData,
    });

    res.status(200).json({
      message: "Трек успешно обновлен",
      updatedTrack,
    });
  } catch (error) {
    console.error("Ошибка при обновлении трека:", error);
    return next(ApiError.internal("Ошибка при обновлении трека"));
  }
};


export const deleteTracks = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params; // Получаем ID трека из URL

    if (!id) {
        return next(ApiError.badRequest("ID трека не указан"));
    }

    try {
        await prisma.$transaction(async (prisma) => {
            await prisma.track_genres.deleteMany({
                where: { track_id: id },
            });
            const deletedTrack = await prisma.tracks.delete({
                where: { track_id: id },
            });

            return deletedTrack;
        });

        res.status(200).json({ message: "Трек и его связи с жанрами успешно удалены" });
    } catch (error) {
        console.error("Ошибка при удалении трека:", error);
        return next(ApiError.internal("Ошибка сервера при удалении трека"));
    }
};