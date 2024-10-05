import Joi from "joi";

export type RegisterDto = {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export const registerDtoValidation = (dto: RegisterDto) => {
    const schema = Joi.object<RegisterDto>({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        // Password has to be an alphanumeric string of length 3-30
        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
        confirmPassword: Joi.string().valid(Joi.ref('password')).required()
    });

    const result = schema.validate(dto);

    if (result.error) {
        throw new Error(result.error.message);
    }

    return result.value;
}