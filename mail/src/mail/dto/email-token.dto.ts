import { IsNotEmpty, IsString } from 'class-validator';
import { EmailDTO } from './email.dto';

export class EmailTokenDTO extends EmailDTO {
  @IsString()
  @IsNotEmpty()
  token: string;
}
