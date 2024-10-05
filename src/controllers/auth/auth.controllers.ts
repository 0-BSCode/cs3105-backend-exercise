import { Request, Response } from "express";
import { LoginInputDto, loginInputDtoValidation } from "./dto/login.dto";
import { RegisterInputDto, registerDtoInputValidation } from "./dto/register.dto";
import { loginUseCase, registerUseCase } from "@use-cases/auth.use-cases";
import { ResponseDto } from "@dto/types/response/response.dto";
import { envConfig } from "@config/env.config";

export const loginController = (req: Request, res: Response) => {
    const { email, password } = req.body;

    const inputDto: LoginInputDto = {
        email,
        password,
    };

    loginInputDtoValidation(inputDto);

    const token = loginUseCase(email, password);

    res.cookie(envConfig.COOKIE_NAME, token, { httpOnly: true, secure: true, maxAge: 5 * 60 * 1000 });
    
    const response: ResponseDto<string> = {
        status: 200,
        payload: "Login successful"
    }

    res.status(response.status).json(response);
}

export const registerController = (req: Request, res: Response) => {
    const { name, email, password, confirmPassword } = req.body;

    const inputDto: RegisterInputDto = {
        name,
        email,
        password,
        confirmPassword
    }

    registerDtoInputValidation(inputDto);

    const token = registerUseCase(email, name, password);

    res.cookie(envConfig.COOKIE_NAME, token, { httpOnly: true, secure: true, maxAge: 5 * 60 * 1000 });

    const response: ResponseDto<string> = {
        status: 201,
        payload: "Registration successful"
    }

    res.status(response.status).json(response);
}