import { JwtPayload } from "@dto/types/jwt/jwt-payload.dto";
import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';

export const authenticateMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies['token'];
    
    if (!token) {
        throw new Error("Unauthorized");
    }

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

        req.userId = payload.id;
        next();
    } catch (e) {
        if (e instanceof Error) {
            throw new Error(e.message);
        }

        throw new Error("Unauthorized");
    }
}