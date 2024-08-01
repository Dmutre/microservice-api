import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class RegisterUserDTO {
  @ApiProperty({ example: 'example@gmail.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'Zuzkin' })
  @IsString()
  @MinLength(3)
  username: string;

  @ApiProperty({ example: 'veriStrongPassword' })
  @IsString()
  @MinLength(8)
  password: string;
}
