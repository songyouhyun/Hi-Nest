// UsersModule 클래스는 이 users 라는 폴더 안의 모듈을 관리하는 클래스입니다.
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

@Module({
  // 이 모듈의 controllers 는 UsersController 클래스를 통해 관리!
  controllers: [UsersController],
  // 이 모듈의 providers 는 UserService 클래스를 통해 관리!
  providers: [UsersService]
})
export class UsersModule {}
