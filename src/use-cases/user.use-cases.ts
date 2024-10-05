import { UserDto } from "@dto/types/user/user.dto";
import { getUserById } from "@models/user.model";

export const fetchUserUseCase = (id: string, userId?: string): Pick<UserDto, 'id' | 'name' | 'email'> => {
    if (userId && userId !== id) {
        throw new Error('Unauthorized to fetch this profile');
    }

    const user = getUserById(id);

    if (!user) {
        throw new Error('User not found');
    }

    const {password, createdAt, ...result} = user;

    return result;
}