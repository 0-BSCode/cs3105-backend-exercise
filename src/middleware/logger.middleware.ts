import { NextFunction, Request, Response } from "express";

export const loggerMiddleware = (req: Request, res: Response, next: NextFunction) => {
    console.info(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
    next()
}