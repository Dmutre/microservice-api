import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
  Min,
} from 'class-validator';
import { ProductActionDTO } from './product-action.dto';

export class UpdateProductDTO extends ProductActionDTO {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  @Min(0)
  @IsOptional()
  @Matches(/^\d+(\.\d{1,2})?$/, {
    message: 'Price must be a valid number with up to two decimal places',
  })
  price: number;

  @IsOptional()
  photo: any;
}
