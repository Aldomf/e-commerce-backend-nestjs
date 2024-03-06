import {
  Controller,
  Post,
  Body,
  Param,
  NotFoundException,
  Get,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
//import { UpdateUserModuleDto } from './dto/update-user.dto';

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

  @Post(':userId/add-product-to-wishlist/:productId')
  async addProductToUser(
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
}
