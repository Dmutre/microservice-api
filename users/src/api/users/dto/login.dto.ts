import { IsNotEmpty, IsString } from 'class-validator';
import { EmailDTO } from './email.dto';

export class LoginDTO extends EmailDTO {
  @IsString()
  @IsNotEmpty()
  password: string;
}
