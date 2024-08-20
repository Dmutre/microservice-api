import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class GetProductsDTO {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  userId?: string;
}
