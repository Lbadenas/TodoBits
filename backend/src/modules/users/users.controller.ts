import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Put,
  ParseUUIDPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/createUser.dto';
import { updateUserDto } from './dto/updateUser.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getAll(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '10',
  ) {
    return this.usersService.getAll(Number(page), Number(limit));
  }

  @Get(':email')
  getByEmail(@Param('email') email: string) {
    return this.usersService.getByemail(email);
  }

  @Post('signup')
  async createUser(@Body() createUserDto: CreateUserDto) {
    try {
      return await this.usersService.createUser(createUserDto);
    } catch (error) {
      throw new BadRequestException(
        error.message || 'Error al crear el usuario',
      );
    }
  }

  @Put(':id')
  async updateUser(
    @Param('id', ParseUUIDPipe) id: string, // ID recibido como parámetro de la URL
    @Body() updateUserDto: updateUserDto,
  ) {
    try {
      return await this.usersService.updateUser(id, updateUserDto);
    } catch (error) {
      throw new BadRequestException(
        error.message || 'Error al actualizar el usuario',
      );
    }
  }
}
