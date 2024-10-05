import { envConfig } from "@config/env.config";
import bcrypt from 'bcrypt';

export const hashSyncBcrypt = (text: string) => {
    return bcrypt.hashSync(text, envConfig.SALT_ROUNDS);
}

export const compareSyncBcrypt = (text: string, hash: string) => {
    return bcrypt.compareSync(text, hash);
}