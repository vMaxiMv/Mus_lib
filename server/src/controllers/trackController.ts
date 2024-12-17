import { PrismaClient } from "@prisma/client";
import { IQueryTypes } from "../interfaces/queryParams";

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
