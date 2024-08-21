import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class TokenDTO {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  token: string;
}
