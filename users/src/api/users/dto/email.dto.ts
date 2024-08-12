import { IsEmail, IsString, IsNotEmpty } from 'class-validator';

export class EmailDTO {
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string;
}
