import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
//import { UpdateUserModuleDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { ProductService } from 'src/product-module/product.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly productService: ProductService, // Inject ProductService
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = this.userRepository.create(createUserDto);
    return await this.userRepository.save(user);
  }

  async findUserByEmail(email: string) {
    const user = await this.userRepository.findOne({
      where: { email },
    });

    return user;
  }

  async findAll() {
    return await this.userRepository.find({
      relations: ['wishlist', 'cartList'],
    });
  }

  async findOne(id: number) {
    const foundUser = await this.userRepository.findOne({
      where: { id },
      relations: ['wishlist', 'cartList', 'orders', 'orders.products'],
    });
    if (!foundUser) {
      throw new NotFoundException('User not found');
    }
    return foundUser;
  }

  async addProductToWishlist(userId: number, productId: number) {
    // Validate userId and productId as numbers
    if (isNaN(userId) || isNaN(productId)) {
      throw new BadRequestException('Invalid user or product ID');
    }
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['wishlist'],
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const product = await this.productService.findOne(productId);
    if (!product) {
      throw new NotFoundException('Product not found');
    }

    // Add the product to the user's list of products
    user.wishlist.push(product);

    // Save the changes to the user
    await this.userRepository.save(user);

    return user; // Optionally, you can return the updated user
  }

  async deleteProductFromWishlist(userId: number, productId: number) {
    // Validate userId and productId as numbers
    if (isNaN(userId) || isNaN(productId)) {
      throw new BadRequestException('Invalid user or product ID');
    }
    // Find the user by userId and eagerly load the wishlist
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['wishlist'],
    });

    // Throw NotFoundException if user is not found
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Find the index of the product in the wishlist array
    const productIndex = user.wishlist.findIndex(
      (product) => product.id === productId,
    );

    // Throw NotFoundException if product is not found in the wishlist
    if (productIndex === -1) {
      throw new NotFoundException('Product not found in wishlist');
    }

    // Remove the product from the wishlist array
    user.wishlist.splice(productIndex, 1);

    // Save the changes to the user
    await this.userRepository.save(user);

    return user; // Optionally, you can return the updated user
  }

  async findOneWishlist(userId: number) {
    // Validate userId as a number
    if (isNaN(userId)) {
      throw new BadRequestException('Invalid user ID');
    }
    // Find the user by userId and eagerly load the wishlist
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['wishlist'],
    });

    // Throw NotFoundException if user is not found
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Return the wishlist of the user
    return user.wishlist;
  }
}
