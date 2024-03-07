import {
  Controller,
  Post,
  Body,
  Param,
  NotFoundException,
  Get,
  Delete,
  UseGuards,
  BadRequestException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthGuard } from 'src/auth-module/guard/auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }
  @UseGuards(AuthGuard)
  @Post(':userId/add-product-to-wishlist/:productId')
  async addProductToWishlist(
    @Param('userId') userId: number,
    @Param('productId') productId: number,
  ) {
    try {
      await this.userService.addProductToWishlist(userId, productId);
      return { message: 'Product added to user wishlist successfully' };
    } catch (error) {
      if (error instanceof NotFoundException) {
        return { error: error.message };
      }
      throw error; // Let other errors propagate
    }
  }

  @UseGuards(AuthGuard)
  @Delete(':userId/delete-product-from-wishlist/:productId')
  async deleteProductFromWishlist(
    @Param('userId') userId: number,
    @Param('productId') productId: number,
  ) {
    try {
      await this.userService.deleteProductFromWishlist(userId, productId);
      return { message: 'Product deleted from user wishlist successfully' };
    } catch (error) {
      if (error instanceof NotFoundException) {
        return { error: error.message };
      }
      throw error; // Let other errors propagate
    }
  }
  @UseGuards(AuthGuard)
  @Get(':userId/wishlist')
  async findOneWishlist(@Param('userId') userId: string) {
    try {
      const wishlist = await this.userService.findOneWishlist(
        parseInt(userId, 10),
      );
      return { wishlist };
    } catch (error) {
      if (
        error instanceof BadRequestException ||
        error instanceof NotFoundException
      ) {
        return { error: error.message };
      }
      throw error; // Let other errors propagate
    }
  }
}
