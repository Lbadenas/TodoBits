import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { validate } from 'class-validator';
import { updateUserDto } from './dto/updateUser.dto';

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
      username: user.name.trim(), // Eliminar espacios y saltos de línea
      email: user.email.trim(),
    }));
  }

  async getByEmail(email: string) {
    const getByEmail = await this.userRepository.findOne({
      where: { email },
    });
    if (!getByEmail) {
      throw new NotFoundException('Usuario con Email no encontrado.');
    }
    return getByEmail;
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    // Valida el DTO automáticamente con la clase de validación
    const errors = await validate(createUserDto);
    if (errors.length > 0) {
      throw new BadRequestException(errors);
    }

    const { name, lastname, email, dni, phone, address, profilePicture } =
      createUserDto;

    // Verificar si ya existe un usuario con el mismo email o dni
    const [existEmail, existDni] = await Promise.all([
      this.userRepository.findOne({ where: { email } }),
      this.userRepository.findOne({ where: { dni } }),
    ]);

    if (existEmail) {
      throw new BadRequestException('El email ya existe');
    }
    if (existDni) {
      throw new BadRequestException('El dni ya existe');
    }

    // Crear el nuevo usuario si no hay errores
    const newUser = this.userRepository.create({
      name,
      lastname,
      email,
      dni,
      phone,
      address,
      profilePicture,
    });

    return this.userRepository.save(newUser);
  }

  async UpdateUser(id: string, updateUserDto: updateUserDto) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }
    return this.userRepository.save({ ...user, ...updateUserDto });
  }
}
