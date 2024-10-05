import { JwtPayload } from "@dto/types/jwt/jwt-payload.dto";
import { verifyJwt } from "@utils/jwt.utils";
import { NextFunction, Request, Response } from "express";

export const authenticateMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies['token'];
    
    if (!token) {
        throw new Error("Unauthorized");
    }

    try {
        const payload = verifyJwt(token) as JwtPayload;

        req.userId = payload.id;
        next();
    } catch (e) {
        if (e instanceof Error) {
            throw new Error(e.message);
        }

        throw new Error("Unauthorized");
    }
}