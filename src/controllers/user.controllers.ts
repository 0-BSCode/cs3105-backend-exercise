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

    const response: ResponseDto<UserDto> = {
        status: 200,
        payload: user
    }

    res.status(response.status).json(response.payload);
}