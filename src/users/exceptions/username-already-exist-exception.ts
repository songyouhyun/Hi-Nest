import { BadRequestException } from "@nestjs/common";

export class UsernameAlreadyExistException extends BadRequestException {
  constructor(error?: string) {
    super("username already exist", error);
  }
}