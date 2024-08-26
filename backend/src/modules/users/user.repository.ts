import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class usersRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async getAll(page: number, limit: number): Promise<User[]> {
    const users = await this.userRepository.find({
      skip: (page - 1) * limit,
      take: limit,
    });

    // Limpieza de datos
    return users.map((user) => ({
      ...user,
      username: user.username.trim(), // Eliminar espacios y saltos de línea
      email: user.email.trim(),
    }));
  }
}
