import { envConfig } from "@config/env"
import jwt from 'jsonwebtoken'

export const signJwt = (payload: any) => {
    return jwt.sign(payload, envConfig.JWT_SECRET, {
        expiresIn: envConfig.JWT_EXPIRES_IN
    })
}

export const verifyJwt = (token: string) => {
    return jwt.verify(token, envConfig.JWT_SECRET)
}