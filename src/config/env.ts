import dotenv from 'dotenv';
dotenv.config();

export const envConfig = {
    PORT: process.env.PORT || 8000,
    JWT_SECRET: process.env.JWT_SECRET || 'secret',
    SALT_ROUNDS: process.env.SALT_ROUNDS || 10
}