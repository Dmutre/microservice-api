import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class UpdateProductDTO {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  title?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty()
  @IsNumber()
  @Min(0)
  @IsOptional()
  price?: number;

  photo?: any;

  productId: string;

  userId: string;
}
