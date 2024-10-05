import { ErrorCodesEnum } from "@dto/enums/error-codes.enum";
import { ServerError } from "@dto/types/error/error.dto";
import Joi from "joi";

export type RegisterInputDto = {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export const registerDtoInputValidation = (dto: RegisterInputDto) => {
    const schema = Joi.object<RegisterInputDto>({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        // Password has to be an alphanumeric string of length 3-30
        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
        confirmPassword: Joi.string().valid(Joi.ref('password')).required()
    }).with('password', 'confirmPassword');

    const result = schema.validate(dto);

    if (result.error) {
        throw new ServerError(ErrorCodesEnum.BAD_REQUEST, result.error.message);
    }

    return result.value;
}