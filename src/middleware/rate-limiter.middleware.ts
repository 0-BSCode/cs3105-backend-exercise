import rateLimit from "express-rate-limit"

export const rateLimiterMiddleware = rateLimit({
    windowMs: Number(process.env.RATE_LIMIT_WINDOW_MS),
    max: Number(process.env.RATE_LIMIT_MAX),
    handler: (req, res) => {
        res.status(429).json({message: "Too many requests"})
    }
})