import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
  Min,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  @Matches(/^[a-zA-Z0-9\s]+$/, {
    message: 'Name must contain only letters, numbers, and spaces',
  })
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^[a-zA-Z0-9\s.,]+$/, {
    message:
      'Description must contain only letters, numbers, spaces, and punctuation',
  })
  readonly description: string;

  @IsNumber()
  @IsNotEmpty()
  @Min(0, { message: 'Price must be greater than or equal to 0' })
  readonly price: number;

  @IsBoolean()
  @IsOptional()
  readonly inStock?: boolean;

  @IsString()
  @IsNotEmpty()
  readonly category: string;

  @IsBoolean()
  @IsOptional()
  readonly hot?: boolean;

  @IsBoolean()
  @IsOptional()
  readonly sale?: boolean;

  @IsBoolean()
  @IsOptional()
  readonly new?: boolean;

  @IsNumber()
  @IsOptional()
  readonly discountPercentage?: number;

  @IsNumber()
  @IsOptional()
  readonly priceWithDiscount?: number;

  @IsBoolean()
  @IsOptional()
  readonly discountActive?: boolean;

  @IsString()
  @IsNotEmpty()
  @Matches(/^https?:\/\/.+\.(png|jpg|jpeg|gif)$/, {
    message: 'Image must be a valid URL ending with .png, .jpg, .jpeg, or .gif',
  })
  readonly image: string;
}
