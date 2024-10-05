import { ErrorCodesEnum } from "@dto/enums/error-codes.enum";
import { ServerError } from "@dto/types/error/error.dto";
import { UserDto } from "@dto/types/user/user.dto";
import { getUserById } from "@models/user.model";

export const fetchUserUseCase = (id: string, userId?: string): Pick<UserDto, 'id' | 'name' | 'email'> => {
    if (userId && userId !== id) {
        throw new ServerError(ErrorCodesEnum.UNAUTHORIZED, 'Unauthorized to fetch this profile');
    }

    const user = getUserById(id);

    if (!user) {
        throw new ServerError(ErrorCodesEnum.NOT_FOUND, 'User not found');
    }

    const {password, createdAt, ...result} = user;

    return result;
}