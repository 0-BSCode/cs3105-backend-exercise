import { ErrorCodesEnum } from "@dto/enums/error-codes.enum";
import { ServerError } from "@dto/types/error/error.dto";
import { UserDto } from "@dto/types/user/user.dto";
import Joi from "joi"

export type FetchUserOutputDto = Pick<UserDto, 'id' | 'name' | 'email'>

export type FetchUserInputDto = {
    id: string;
}

export const fetchUserInputDtoValidation = (dto: FetchUserInputDto) => {
    const schema = Joi.object<FetchUserInputDto>({
        id: Joi.string().required()
    })

    const result = schema.validate(dto);

    if (result.error) {
        throw new ServerError(ErrorCodesEnum.BAD_REQUEST, result.error.message);
    }

    return result.value;
}