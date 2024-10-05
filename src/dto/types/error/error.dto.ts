import { ErrorCodesEnum } from "@dto/enums/error-codes.enum";

export class ServerError extends Error {
    status: ErrorCodesEnum;
    constructor(status: ErrorCodesEnum, message: string) {
        super(message);
        this.status = status;
    }
}