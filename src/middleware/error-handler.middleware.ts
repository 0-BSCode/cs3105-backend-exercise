import { ServerError } from "@dto/types/error/error.dto";
import { NextFunction, Request, Response } from "express";

export const errorHandlerMiddleware = (err: ServerError, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(err.status).json({message: err.message});
}