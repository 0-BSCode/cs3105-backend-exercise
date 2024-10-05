import { Request, Response } from "express";
import {getUserById, UserModel} from '@models/user.model';
import { UserDto } from "@dto/types/user/user.dto";
import { ResponseDto } from "@dto/types/response/response.dto";

export const fetchUserController = (req: Request, res: Response) => {
    const { id } = req.params;

    if (req.userId && req.userId !== id) {
        throw new Error('Unauthorized to fetch this profile');
    }

    // USE CASE: Find user by ID
    const user = getUserById(id);

    if (!user) {
        throw new Error('User not found');
    }

    const {password, createdAt, updatedAt, ...result} = user;

    const response: ResponseDto<Pick<UserDto, 'id' | 'name' | 'email'>> = {
        status: 200,
        payload: result
    }

    res.status(response.status).send(response);
}