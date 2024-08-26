import { IsOptional, IsString, Length, Matches } from 'class-validator';

export class updateUserDto {
  @IsOptional()
  @IsString()
  @Length(3, 20)
  name?: string;

  @IsOptional()
  @IsString()
  @Length(3, 50)
  lastname?: string;

  @IsOptional()
  @Length(3, 15)
  @IsString()
  @Matches(/^\d+$/, {
    message: 'El número de teléfono solo puede contener dígitos',
  })
  phone?: string;

  @IsOptional()
  @IsString()
  @Length(3, 80)
  address?: string;

  @IsString()
  @IsOptional()
  @Length(3, 130)
  profilePicture?: string;
}
