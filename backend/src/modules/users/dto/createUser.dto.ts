import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  Matches,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  @IsString()
  @Length(3, 20)
  name: string;

  @IsNotEmpty({ message: 'El apellido es obligatorio' })
  @IsString()
  @Length(3, 50)
  lastname: string;

  @IsNotEmpty({ message: 'El email es obligatorio' })
  @IsEmail({}, { message: 'El email no es válido' })
  email: string;

  @IsString()
  @Length(7, 8)
  @IsNotEmpty({ message: 'El dni es obligatorio' })
  dni: string;

  @Length(3, 15)
  @IsString()
  @IsNotEmpty()
  @Matches(/^\d+$/, {
    message: 'El número de teléfono solo puede contener dígitos',
  })
  phone: string;

  @IsNotEmpty()
  @IsString()
  @Length(3, 80)
  address: string;

  @IsString()
  @IsOptional()
  @Length(3, 130)
  profilePicture: string;
}
