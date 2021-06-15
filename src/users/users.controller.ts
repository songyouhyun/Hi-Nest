import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

// /users 라는 주소로 요청이 들어오면 이 클래스에서 처리
@Controller('users')
export class UsersController {
  // UserService 부분에서 Injectable 데코레이터를 통해 UserService 를 Injectable 한 provider 로 지정
  // 따라서 UserController 클래스 내의 constructor 에서 단순히 userService 의 타입을 UserService 로 지정해줌으로서,
  // NestJS가 알아서 this.userService 의 생성과 소멸을 관리하게 됩니다.
  constructor(private readonly usersService: UsersService) {}

  @Post()
  // @Body 데코레이터는 request body 의 내용을 변수에 할당하겠다는 뜻
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  // ':' 로 시작하는 문자열은 파라메터라는 값으로 인식하겠다는 뜻입니다.
  @Get(':id')
  // findOne 을 보시면 함수 인자 값에 @Param('id') 이라는 데코레이터를 붙여 :id 위치의 값을 id 라는 값에 할당하는 과정을 볼 수 있습니다.
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  // @Body annotation 은 response body 안에서 해당하는 필드를 가져와 변수에 입력해주는 기능을 합니다!!
  @Delete()
  remove(@Body('email') email: string) {
    return this.usersService.remove(email);
  }
}
