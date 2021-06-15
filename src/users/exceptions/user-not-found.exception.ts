import { BadRequestException } from "@nestjs/common";

export class UserNotFoundException extends BadRequestException {
    constructor(error?: string) {
        super("user not found", error);
    }
}