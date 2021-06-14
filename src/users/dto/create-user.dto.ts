// class-validator 는 data 가 전송될 때 해당 필드가 적절한 유효성을 가지는지 검사해주는 라이브러리 입니다.
import { IsNotEmpty } from "class-validator";
export class CreateUserDto {
    @IsNotEmpty()
    readonly username: string;

    @IsNotEmpty()
    readonly email: string;

    @IsNotEmpty()
    readonly password: string;
}