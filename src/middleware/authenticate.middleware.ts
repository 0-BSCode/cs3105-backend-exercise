import { envConfig } from "@config/env.config";
import { ErrorCodesEnum } from "@dto/enums/error-codes.enum";
import { ServerError } from "@dto/types/error/error.dto";
import { JwtPayload } from "@dto/types/jwt/jwt-payload.dto";
import { verifyJwt } from "@utils/jwt.utils";
import { NextFunction, Request, Response } from "express";

export const authenticateMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies[envConfig.COOKIE_NAME];
    
    if (!token) {
        throw new ServerError(ErrorCodesEnum.UNAUTHORIZED, "No token provided");
    }

    try {
        const payload = verifyJwt(token) as JwtPayload;

        req.userId = payload.id;
        next();
    } catch (e) {
        if (e instanceof Error) {
            throw new ServerError(ErrorCodesEnum.UNAUTHORIZED, e.message);
        }

        throw new ServerError(ErrorCodesEnum.INTERNAL_SERVER_ERROR, "Server error");
    }
}