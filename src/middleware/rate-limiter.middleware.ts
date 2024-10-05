import { ErrorCodesEnum } from "@dto/enums/error-codes.enum"
import { ServerError } from "@dto/types/error/error.dto"
import rateLimit from "express-rate-limit"

export const rateLimiterMiddleware = rateLimit({
    windowMs: Number(process.env.RATE_LIMIT_WINDOW_MS),
    max: Number(process.env.RATE_LIMIT_MAX),
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req, res) => {
        throw new ServerError(ErrorCodesEnum.TOO_MANY_REQUESTS, "Too many requests")
    }
})