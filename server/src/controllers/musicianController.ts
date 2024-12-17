import { PrismaClient } from "@prisma/client";
import { IQueryTypes } from "../interfaces/queryParams";
import { NextFunction, Request, Response } from "express";

const ApiError = require('../error/ApiError')
const prisma = new PrismaClient()

export const getMusicians = async ({req, res, next}: IQueryTypes)=>{
    try {
        const musician = await prisma.musician.findMany();
        res.status(200).json(musician)
    }
    catch(error){
        return next(ApiError.badRequest('Ошибка'))
    }
}

export const getMusiciansById = async (req: Request, res: Response, next: NextFunction) => {
    const {id} = req.params
    try {
        const musician = await prisma.musician.findUnique({
            where: {musician_id: id}
        })
        if (!musician){
            return next(ApiError.badRequest('Музыкант не найден'))
        }
        res.status(200).json(musician)
    } catch(error){
        return next(ApiError.internal('Ошибка сервера при получении музыканта'))
    }
}

export const createMusicians = async (req: Request, res: Response, next: NextFunction) => {
    const {name, birth_date, country} = req.body
    if(!name || !birth_date || !country){
        return next(ApiError.badRequest('Отсутствуют обязательные данные'))
    }
    try {
        const newMusician = await prisma.musician.create({
            data:{
                name,
                birth_date,
                country
            }
        })
        res.status(200).json(newMusician)
    }
    catch (error){
        return next(ApiError.internal('Ошибка сервера при создании исполнителя'))
    }
}

export const updateMusicians = async (req: Request, res: Response, next: NextFunction) => {
    const {musician_id, name, birth_date, country} = req.body
    //const {id} = req.params
    if(!musician_id || !name || !birth_date || !country){
        return next(ApiError.badRequest('Отсутствуют обязательные данные'))
    }
    try {
        const updatedMusician = await prisma.musician.update({
            where: {musician_id: musician_id},
            data: {musician_id, name, birth_date, country}
        })
        res.status(200).json({message: 'Музыкант успешно обновлен', updatedMusician})
    } catch (error){
        return next(ApiError.badRequest('Ошибка при обновлении музыканта'))
    }
}

export const deleteMusicians = async (req: Request, res: Response, next: NextFunction) => {
    const {id} = req.params
    try {
        const deletedMusician = await prisma.musician.delete({
            where: {musician_id: String(id)}
        })
        res.status(200).json({message: 'Музыкант успешно удален', deletedMusician})
    } catch (error){
        return next(ApiError.badRequest('Ошибка при удалении музыканта'))
    }
}