import { PrismaClient } from "@prisma/client";
import { IQueryTypes } from "../interfaces/queryParams";
import { NextFunction, Request, Response } from "express";

const ApiError = require('../error/ApiError')

const prisma = new PrismaClient()

export const addTrackToPlaylist = async (req: Request, res: Response, next: NextFunction) => {
     const { playlist_id, track_id } = req.body;
  
  
    if (!playlist_id || !track_id) {
        return next(ApiError.badRequest('Необходимо передать playlist_id и track_id'))
    }
  
    try {
  
      const playlistTrack = await prisma.playlist_tracks.create({
        data: {
          playlist_id,
          track_id
        }
      });
  
      res.status(200).json({
        message: "Трек успешно добавлен в плейлист",
        playlistTrack
      });
    } catch (error) {
      console.error('Ошибка:', error); 
      return next(ApiError.internal('Ошибка сервера при добавлении трека в плейлист'))
    }
  };

  export const removeTrackFromPlaylist = async (req: Request, res: Response, next: NextFunction) => {
    const { playlist_id, track_id } = req.body;
  
    if (!playlist_id || !track_id) {
      return next(ApiError.badRequest('Необходимо передать playlist_id и track_id'));
    }
  
    try {
      const deletedTrack = await prisma.playlist_tracks.deleteMany({
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
    } catch (error) {
      console.error('Ошибка:', error);
      return next(ApiError.internal('Ошибка сервера при удалении трека из плейлиста'));
    }
  };