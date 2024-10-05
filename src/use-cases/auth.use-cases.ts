import { createUser, getUserByEmail } from "@models/user.model";
import { JwtPayload } from "@dto/types/jwt/jwt-payload.dto";
import { CreateUserDto } from "@dto/types/user/create-user.dto";
import { signJwt } from "@utils/jwt.utils";
import { compareSyncBcrypt, hashSyncBcrypt } from "@utils/bcrypt.utils";
import { ServerError } from "@dto/types/error/error.dto";
import { ErrorCodesEnum } from "@dto/enums/error-codes.enum";

export const loginUseCase = (email: string, password: string): string => {
    const user = getUserByEmail(email);

    if (!user) {
        throw new ServerError(ErrorCodesEnum.NOT_FOUND, `User with email "${email}" not found`);
    }

    const isMatch = compareSyncBcrypt(password, user.password);

    if (!isMatch) {
        throw new ServerError(ErrorCodesEnum.BAD_REQUEST, 'Incorrect password');
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
        throw new ServerError(ErrorCodesEnum.BAD_REQUEST, 'User with email already exists');
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