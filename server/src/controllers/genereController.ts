import { PrismaClient } from "@prisma/client";
import { IQueryTypes } from "../interfaces/queryParams";

const ApiError = require('../error/ApiError')
const prisma = new PrismaClient()

export const getGenres = async ({req, res, next}: IQueryTypes)=>{
    try {
        const genres = await prisma.genres.findMany();
        res.status(200).json(genres)
    }
    catch(error){
        return next(ApiError.badRequest('Ошибка'))
    }
}
