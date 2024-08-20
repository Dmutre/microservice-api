import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class EmailDTO {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
