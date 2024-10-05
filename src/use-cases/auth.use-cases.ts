import { createUser, getUserByEmail } from "@models/user.model";
import { JwtPayload } from "@dto/types/jwt/jwt-payload.dto";
import { CreateUserDto } from "@dto/types/user/create-user.dto";
import { signJwt } from "@utils/jwt.utils";
import { compareSyncBcrypt, hashSyncBcrypt } from "@utils/bcrypt.utils";

export const loginUseCase = (email: string, password: string): string => {
    const user = getUserByEmail(email);

    if (!user) {
        throw new Error(`User with email "${email}" not found`);
    }

    const isMatch = compareSyncBcrypt(password, user.password);

    if (!isMatch) {
        throw new Error('Incorrect password');
    }

    const payload: JwtPayload = {
        id: user.id,
        name: user.name
    };

    const token = signJwt(payload);

    return token;
}

export const registerUseCase = (email: string, name: string, password: string): string => {
    const user = getUserByEmail(email);

    if (user) {
        throw new Error('User with email already exists');
    }

    const createUserDto: CreateUserDto = {
        email,
        name,
        password: hashSyncBcrypt(password),
    }

    const newUser = createUser(createUserDto);

    const payload: JwtPayload = {
        id: newUser.id,
        name: newUser.name
    };

    const token = signJwt(payload);

    return token;
}