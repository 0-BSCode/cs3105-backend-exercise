import { createUser, getUserByEmail, getUserByName } from "@models/user.model";
import { Request, Response } from "express";
import bcrypt from 'bcrypt';
import { JwtPayload } from "@dto/types/jwt/jwt-payload.dto";
import jwt from 'jsonwebtoken';
import { CreateUserDto } from "@dto/types/user/create-user.dto";

const SALT_ROUNDS = 10;

export const loginController = (req: Request, res: Response) => {
    const { username, password } = req.body;

    const user = getUserByName(username);

    if (!user) {
        throw new Error('User not found');
    }

    const isMatch = bcrypt.compareSync(password, user.password);

    // if (!isMatch) {
    //     throw new Error('Wrong password');
    // }

    const payload: JwtPayload = {
        id: user.id,
        name: user.name
    };


    const token = jwt.sign(payload, process.env.JWT_SECRET!, {
        expiresIn: '15s'
    });

    res.cookie('token', token, { httpOnly: true, secure: true, maxAge: 15 * 1000 });
    
    res.status(200).json({ token });
}

export const registerController = (req: Request, res: Response) => {
    const { username, email, password } = req.body;

    const user = getUserByEmail(email);

    if (user) {
        throw new Error('User with email already exists');
    }

    const dto: CreateUserDto = {
        email,
        name: username,
        password: bcrypt.hashSync(password, SALT_ROUNDS),
    }

    console.log(dto);

    const newUser = createUser(dto);

    const payload: JwtPayload = {
        id: newUser.id,
        name: newUser.name
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET!, {
        expiresIn: '15s'
    });

    res.cookie('token', token, { httpOnly: true, secure: true, maxAge: 15 * 1000 });

    res.status(201).json(newUser);
}