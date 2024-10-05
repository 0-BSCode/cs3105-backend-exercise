import { createUser, getUserByEmail } from "@models/user.model";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { JwtPayload } from "@dto/types/jwt/jwt-payload.dto";
import { CreateUserDto } from "@dto/types/user/create-user.dto";
import { envConfig } from "@config/env";

export const loginUseCase = (email: string, password: string): string => {
    const user = getUserByEmail(email);

    if (!user) {
        throw new Error(`User with email "${email}" not found`);
    }

    const isMatch = bcrypt.compareSync(password, user.password);

    if (!isMatch) {
        throw new Error('Incorrect password');
    }

    const payload: JwtPayload = {
        id: user.id,
        name: user.name
    };

    // TODO: Extract (DRY and don't use magic values)
    const token = jwt.sign(payload, process.env.JWT_SECRET!, {
        expiresIn: '5m'
    });

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
        password: bcrypt.hashSync(password, envConfig.SALT_ROUNDS),
    }

    const newUser = createUser(createUserDto);

    const payload: JwtPayload = {
        id: newUser.id,
        name: newUser.name
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET!, {
        expiresIn: '5m'
    });

    return token;
}