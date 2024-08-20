import { IsString, IsNotEmpty } from 'class-validator';

export class ProductActionDTO {
  @IsString()
  @IsNotEmpty()
  productId: string;

  @IsString()
  @IsNotEmpty()
  userId: string;
}
