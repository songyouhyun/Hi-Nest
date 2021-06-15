import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { validate } from 'class-validator';
import { DeleteResult } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { EmailAlreadyExistException } from './exceptions/email-already-exist-exception';
import { UsernameAlreadyExistException } from './exceptions/username-already-exist-exception';
import { UserRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(createUserDto: CreateUserDto) {
    const { username, email, password } = createUserDto;

    const thisUser = await this.userRepository.findOne({ username: username });
    if (thisUser) {
      const error = "UserName is already exist";
      throw new UsernameAlreadyExistException(error);
    }

    const thisEmail = await this.userRepository.findOne({ email: email });
    if (thisEmail) {
      const error = "Email is already exist";
      throw new EmailAlreadyExistException(error);
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
        const userId = await this.userRepository.save(newUser).then((v) => v.id);
        return { userId: userId };
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

  async remove(email: string): Promise<DeleteResult> {
    return await this.userRepository.delete({ email: email });
  }
}
