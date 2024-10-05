import Joi from 'joi';
import dotenv from 'dotenv';
dotenv.config();

export const envConfig = {
    PORT: process.env.PORT as string,
    JWT_SECRET: process.env.JWT_SECRET as string,
    SALT_ROUNDS: process.env.SALT_ROUNDS as string,
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN as string,
    COOKIE_MAX_AGE: process.env.COOKIE_MAX_AGE as string,
    RATE_LIMIT_WINDOW_MS: process.env.RATE_LIMIT_WINDOW_MS as string,
    RATE_LIMIT_MAX: process.env.RATE_LIMIT_MAX as string,
}

export const checkEnv = () => {
    const schema = Joi.object({
        PORT: Joi.string().required(),
        JWT_SECRET: Joi.string().required(),
        SALT_ROUNDS: Joi.string().required(),
        JWT_EXPIRES_IN: Joi.string().required(),
        COOKIE_MAX_AGE: Joi.string().required(),
        RATE_LIMIT_WINDOW_MS: Joi.string().required(),
        RATE_LIMIT_MAX: Joi.string().required(),
    });
    const result = schema.validate(envConfig);

    if (result.error) {
        console.error(result.error.message);
        process.exit(1);
    }

    return;
}