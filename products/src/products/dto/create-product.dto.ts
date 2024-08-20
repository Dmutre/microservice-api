import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
  Min,
} from 'class-validator';

export class CreateProductDTO {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  @Min(0)
  @Matches(/^\d+(\.\d{1,2})?$/, {
    message: 'Price must be a valid number with up to two decimal places',
  })
  price: number;

  @IsString()
  @IsNotEmpty()
  userId: string;
}
