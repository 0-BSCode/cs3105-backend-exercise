import { createUser, getUserByEmail } from "@models/user.model";
import { Request, Response } from "express";
import bcrypt from 'bcrypt';
import { JwtPayload } from "@dto/types/jwt/jwt-payload.dto";
import jwt from 'jsonwebtoken';
import { CreateUserDto } from "@dto/types/user/create-user.dto";
import { LoginDto, loginDtoValidation } from "./dto/login.dto";
import { RegisterDto, registerDtoValidation } from "./dto/register.dto";

const SALT_ROUNDS = 10;

export const loginController = (req: Request, res: Response) => {
    const { email, password } = req.body;

    const inputDto: LoginDto = {
        email,
        password,
    };

    loginDtoValidation(inputDto);

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

    res.cookie('token', token, { httpOnly: true, secure: true, maxAge: 5 * 60 * 1000 });
    
    res.status(200).json({ token });
}

export const registerController = (req: Request, res: Response) => {
    const { username, email, password, confirmPassword } = req.body;

    const inputDto: RegisterDto = {
        name: username,
        email,
        password,
        confirmPassword
    }

    registerDtoValidation(inputDto);

    const user = getUserByEmail(email);

    if (user) {
        throw new Error('User with email already exists');
    }

    const createUserDto: CreateUserDto = {
        email,
        name: username,
        password: bcrypt.hashSync(password, SALT_ROUNDS),
    }

    const newUser = createUser(createUserDto);

    const payload: JwtPayload = {
        id: newUser.id,
        name: newUser.name
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET!, {
        expiresIn: '5m'
    });

    res.cookie('token', token, { httpOnly: true, secure: true, maxAge: 5 * 60 * 1000 });

    res.status(201).json(newUser);
}