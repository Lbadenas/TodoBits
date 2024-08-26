import { Injectable } from '@nestjs/common';
import { usersRepository } from './user.repository';
import { CreateUserDto } from './dto/createUser.dto';
import { updateUserDto } from './dto/updateUser.dto';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: usersRepository) {}

  getAll(page: number, limit: number) {
    return this.usersRepository.getAll(page, limit);
  }
  getByemail(email: string) {
    return this.usersRepository.getByEmail(email);
  }
  createUser(createUserDto: CreateUserDto) {
    return this.usersRepository.createUser(createUserDto);
  }
  updateUser(id: string, updateUserDto: updateUserDto) {
    return this.usersRepository.UpdateUser(id, updateUserDto);
  }
}
