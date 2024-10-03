import { UserDto } from "./user.dto.js";

export type CreateUserDto = Omit<UserDto, "id" | "createdAt" | "updatedAt">; 