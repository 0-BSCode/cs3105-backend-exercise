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

    const result = schema.validate(dto, { allowUnknown: false });

    if (result.error) {
        throw new Error(result.error.message);
    }

    return result.value;
}