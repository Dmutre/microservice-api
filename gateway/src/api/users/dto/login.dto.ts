import { IsNotEmpty, IsString } from 'class-validator';
import { EmailDTO } from './email.dto';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDTO extends EmailDTO {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  password: string;
}
