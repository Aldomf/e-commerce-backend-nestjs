import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  BadRequestException,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { WishlistService } from './wishlist.service';
import { AuthGuard } from 'src/auth-module/guard/auth.guard';

@Controller('wishlist')
@UseGuards(AuthGuard)
export class WishlistController {
  constructor(private readonly wishlistService: WishlistService) {}

  @Post(':userId/add-product-to-wishlist/:productId')
  async addProductToWishlist(
    @Param('userId') userId: number,
    @Param('productId') productId: number,
  ) {
    try {
      await this.wishlistService.addProductToWishlist(userId, productId);
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
      await this.wishlistService.deleteProductFromWishlist(userId, productId);
      return { message: 'Product deleted from user wishlist successfully' };
    } catch (error) {
      if (error instanceof NotFoundException) {
        return { error: error.message };
      }
      throw error; // Let other errors propagate
    }
  }

  @Get('user/:userId')
  async findOneWishlist(@Param('userId') userId: string) {
    try {
      const wishlist = await this.wishlistService.findOneWishlist(
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
