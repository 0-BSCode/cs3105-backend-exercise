import Joi from "joi"

export type FetchUserDto = {
    id: string;
}

export const fetchUserDtoValidation = (dto: FetchUserDto) => {
    const schema = Joi.object<FetchUserDto>({
        id: Joi.string().required()
    })

    const result = schema.validate(dto);

    if (result.error) {
        throw new Error(result.error.message);
    }

    return result.value;
}