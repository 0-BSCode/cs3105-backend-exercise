import { ErrorCodesEnum } from "@dto/enums/error-codes.enum";
import { ServerError } from "@dto/types/error/error.dto";
import Joi from "joi";

export type LoginInputDto = {
    email: string,
    password: string
}

export const loginInputDtoValidation = (dto: LoginInputDto) => {
    const schema = Joi.object<LoginInputDto>({
        email: Joi.string().required(),
        password: Joi.string().required()
    });

    const result = schema.validate(dto);

    if (result.error) {
        throw new ServerError(ErrorCodesEnum.BAD_REQUEST, result.error.message);
    }

    return result.value;
}