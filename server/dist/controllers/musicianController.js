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
exports.deleteMusicians = exports.updateMusicians = exports.createMusicians = exports.getMusiciansById = exports.getMusicians = void 0;
const client_1 = require("@prisma/client");
const ApiError = require('../error/ApiError');
const prisma = new client_1.PrismaClient();
const getMusicians = (_a) => __awaiter(void 0, [_a], void 0, function* ({ req, res, next }) {
    try {
        const musician = yield prisma.musician.findMany();
        res.status(200).json(musician);
    }
    catch (error) {
        return next(ApiError.badRequest('Ошибка'));
    }
});
exports.getMusicians = getMusicians;
const getMusiciansById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const musician = yield prisma.musician.findUnique({
            where: { musician_id: id }
        });
        if (!musician) {
            return next(ApiError.badRequest('Музыкант не найден'));
        }
        res.status(200).json(musician);
    }
    catch (error) {
        return next(ApiError.internal('Ошибка сервера при получении музыканта'));
    }
});
exports.getMusiciansById = getMusiciansById;
const createMusicians = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, birth_date, country } = req.body;
    if (!name || !birth_date || !country) {
        return next(ApiError.badRequest('Отсутствуют обязательные данные'));
    }
    try {
        const newMusician = yield prisma.musician.create({
            data: {
                name,
                birth_date,
                country
            }
        });
        res.status(200).json(newMusician);
    }
    catch (error) {
        return next(ApiError.internal('Ошибка сервера при создании исполнителя'));
    }
});
exports.createMusicians = createMusicians;
const updateMusicians = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { musician_id, name, birth_date, country } = req.body;
    //const {id} = req.params
    if (!musician_id || !name || !birth_date || !country) {
        return next(ApiError.badRequest('Отсутствуют обязательные данные'));
    }
    try {
        const updatedMusician = yield prisma.musician.update({
            where: { musician_id: musician_id },
            data: { musician_id, name, birth_date, country }
        });
        res.status(200).json({ message: 'Музыкант успешно обновлен', updatedMusician });
    }
    catch (error) {
        return next(ApiError.badRequest('Ошибка при обновлении музыканта'));
    }
});
exports.updateMusicians = updateMusicians;
const deleteMusicians = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const deletedMusician = yield prisma.musician.delete({
            where: { musician_id: String(id) }
        });
        res.status(200).json({ message: 'Музыкант успешно удален', deletedMusician });
    }
    catch (error) {
        return next(ApiError.badRequest('Ошибка при удалении музыканта'));
    }
});
exports.deleteMusicians = deleteMusicians;
