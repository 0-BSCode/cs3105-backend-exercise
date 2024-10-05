import { NextFunction, Request, Response } from "express";

export const loggerMiddleware = (req: Request, res: Response, next: NextFunction) => {
    console.info(`[${req.method}] ${req.path}`);
    next()
}