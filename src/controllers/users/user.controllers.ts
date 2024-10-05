import { Request, Response } from "express";
import { UserDto } from "@dto/types/user/user.dto";
import { ResponseDto } from "@dto/types/response/response.dto";
import { FetchUserInputDto, fetchUserInputDtoValidation } from "./dto/fetch-user.dto";
import { fetchUserUseCase } from "@use-cases/user.use-cases";

export const fetchUserController = (req: Request, res: Response) => {
    const { id } = req.params;

    const inputDto: FetchUserInputDto = {
        id
    }

    fetchUserInputDtoValidation(inputDto);

    const user = fetchUserUseCase(id, req.userId);

    const response: ResponseDto<Pick<UserDto, 'id' | 'name' | 'email'>> = {
        status: 200,
        payload: user
    }

    res.status(response.status).send(response);
}