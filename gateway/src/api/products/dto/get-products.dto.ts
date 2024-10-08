import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class GetProductsDTO {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  userId?: string;
}
