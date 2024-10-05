import { CreateUserDto } from "@dto/types/user/create-user.dto"
import { UserDto } from "@dto/types/user/user.dto"

export type UserModel = {
    id: string
    name: string
    email: string
    password: string
    createdAt: Date
    updatedAt: Date
}

export const userDb: UserModel[] = []

// Database Services
export const getUserById = (id: string): UserDto | null => {
    const record = userDb.find(user => user.id === id);

    if (!record) {
        return null;
    }

    return convertToDto(record);
}

export const getUserByEmail = (email: string): UserDto | null => {
    const record = userDb.find(user => user.email === email);

    if (!record) {
        return null;
    }

    return convertToDto(record);
}

export const createUser = (dto: CreateUserDto): UserDto => {
    const newRecord: UserModel = {
        id: generateId(),
        name: dto.name,
        email: dto.email,
        password: dto.password,
        createdAt: new Date(),
        updatedAt: new Date()
    }

    userDb.push(newRecord);
    return convertToDto(newRecord);
}

// Helpers
const generateId = (): string => {
    return userDb.length.toString();
}

const convertToDto = (user: UserModel): UserDto => {
    return {
        id: user.id,
        name: user.name,
        email: user.email,
        password: user.password,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
    }
}