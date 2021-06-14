import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { validate } from 'class-validator';
import { getRepository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UserRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(createUserDto: CreateUserDto) {
    const { username, email, password } = createUserDto;

    const getByUserName = getRepository(User)
      .createQueryBuilder('user')
      .where('user.username = :username', { username });

    // 첫 SQL 문
    const byUserName = await getByUserName.getOne();
      if (byUserName) {
        const error = { username: 'UserName is already exists' };
        throw new HttpException(
          { message: 'Input Data validation failed', error },
          HttpStatus.BAD_REQUEST,
        );
      }

    const getByEmail = getRepository(User)
      .createQueryBuilder('user')
      .where('user.email = :email', { email });

      const byEmail = await getByEmail.getOne();
      if (byEmail) {
        const error = { email: 'email is already exists '};
        throw new HttpException(
          { message: 'Input data validation failed', error },
          HttpStatus.BAD_REQUEST,
        );
      }

      // const thisuser = await this.userRepository.findOne({ username: username });
      // const thisEmail = this.userRepository.findOne({ email: email });

      // create new user
      let newUser = new User();
      newUser.email = email;
      newUser.password = password;
      newUser.username = username;

      const validate_error = await validate(newUser);
      if (validate_error.length > 0) {
        const _error = { username: 'UserInput is not valid check type' };
        throw new HttpException(
          { message: 'Input data validation failed', _error },
          HttpStatus.BAD_REQUEST,
        );
      } else {
        return await this.userRepository.save(newUser).then((v) => v.id);
      }
  }

  findAll() {
    return `This action returns all users`;
  }

  async findByEmail(email: string) {
    return await this.userRepository.findOne({ email });
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
