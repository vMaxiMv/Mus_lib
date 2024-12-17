import { NextFunction, Request, Response } from "express";
import { UploadedFile } from "express-fileupload";

export interface IQueryTypes {
    req: Request;
    res: Response;
    next: NextFunction
}


