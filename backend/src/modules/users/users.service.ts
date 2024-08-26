import { Injectable } from '@nestjs/common';
import { usersRepository } from './user.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: usersRepository) {}

  getAll(page: number, limit: number) {
    return this.usersRepository.getAll(page, limit);
  }
}
