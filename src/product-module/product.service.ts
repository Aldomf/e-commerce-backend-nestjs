import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { CategoryService } from 'src/category/category.service';
import { Category } from 'src/category/entities/category.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    private readonly categoryService: CategoryService,
  ) {}

  async create(createProductDto: CreateProductDto) {
    // Check if the product with the same name already exists
    const foundProduct = await this.productRepository.findOne({
      where: { name: createProductDto.name },
    });
    if (foundProduct) {
      throw new BadRequestException(
        'Product with the same name already exists',
      );
    }

    // Check if the provided category exists in the database
    const category = await this.categoryService.findOneByName(
      createProductDto.category,
    );
    if (!category) {
      throw new BadRequestException('Category does not exist');
    }

    // Calculate priceWithDiscount if a discount is applicable and discount is active
    let priceWithDiscount: number = createProductDto.price; // By default, set it to the original price

    if (
      createProductDto.discountPercentage > 0 &&
      createProductDto.discountActive
    ) {
      const discount = createProductDto.discountPercentage / 100;
      priceWithDiscount = +(createProductDto.price * (1 - discount)).toFixed(2);
    }

    console.log(priceWithDiscount);

    // Create and save the new product
    const createdProduct = this.productRepository.create({
      ...createProductDto,
      category,
      priceWithDiscount,
    });
    return await this.productRepository.save(createdProduct);
  }

  async findAll() {
    return await this.productRepository.find({ relations: ['category'] });
  }

  async findOne(id: number) {
    const foundProduct = await this.productRepository.findOne({
      where: { id },
      relations: ['category'],
    });
    if (!foundProduct) {
      throw new NotFoundException('Product not found');
    }
    return foundProduct;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    // Check if the product exists
    const productExist = await this.productRepository.findOne({
      where: { id },
    });
    if (!productExist) {
      throw new NotFoundException('Product not found');
    }

    // Check if the product name already exists
    if (updateProductDto.name) {
      const productName = await this.productRepository.findOne({
        where: { name: updateProductDto.name },
      });
      if (productName && productName.id !== id) {
        throw new BadRequestException(
          'Product with the same name already exists',
        );
      }
    }

    // Convert category name to Category entity
    let category: Category | undefined;
    if (updateProductDto.category) {
      category = await this.categoryService.findOneByName(
        updateProductDto.category,
      );
      if (!category) {
        throw new BadRequestException('Category does not exist');
      }
    }

    // Validate price
    if (
      !Number.isFinite(updateProductDto.price) ||
      updateProductDto.price <= 0
    ) {
      throw new BadRequestException('Price must be a valid positive number');
    }

    // Validate discountPercentage
    if (
      updateProductDto.discountPercentage &&
      (updateProductDto.discountPercentage <= 0 ||
        updateProductDto.discountPercentage >= 100)
    ) {
      throw new BadRequestException(
        'Discount percentage must be a valid number between 0 and 100',
      );
    }

    // Calculate priceWithDiscount if both price and discountPercentage are provided
    const { price, discountPercentage } = updateProductDto;
    let priceWithDiscount = price;
    if (discountPercentage) {
      priceWithDiscount -= (price * discountPercentage) / 100;
    }

    // Create a partial entity object with the updated fields
    const partialEntity: Partial<Product> = {
      ...updateProductDto,
      category: category ?? productExist.category, // Use the existing category if not provided in the DTO
      priceWithDiscount: priceWithDiscount, // Update priceWithDiscount field
    };

    await this.productRepository.update(id, partialEntity);
    return await this.productRepository.findOne({
      where: { id },
      relations: ['category'],
    }); // Optionally, you can return the updated product
  }

  async remove(id: number) {
    const foundProduct = await this.productRepository.findOne({
      where: { id },
    });
    if (!foundProduct) {
      throw new NotFoundException('Product not found');
    }
    return await this.productRepository.delete(id);
  }
}
