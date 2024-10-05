import Joi from "joi";

export type LoginDto = {
    email: string,
    password: string
}

export const loginDtoValidation = (dto: LoginDto) => {
    const schema = Joi.object<LoginDto>({
        email: Joi.string().required(),
        password: Joi.string().required()
    });

    const result = schema.validate(dto);

    if (result.error) {
        throw new Error(result.error.message);
    }

    return result.value;
}