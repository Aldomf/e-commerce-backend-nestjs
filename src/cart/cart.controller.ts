import {
  Controller,
  Post,
  Param,
  Delete,
  Get,
  Patch,
  NotFoundException,
  BadRequestException,
  UseGuards,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { CartGuard } from 'src/common/guards/cart.guard';
import { AdminGuard } from 'src/common/guards/admin.guard';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @UseGuards(AdminGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cartService.constructItemsArray(+id);
  }

  @UseGuards(CartGuard)
  @Post(':userId/add-product-to-cartList/:productId')
  async addToCart(
    @Param('productId') productId: number,
    @Param('userId') userId: number,
  ) {
    await this.cartService.addProductToCart(productId, userId);
    return { message: 'Product added to cart successfully' };
  }

  @UseGuards(CartGuard)
  @Delete(':userId/delete-product-from-cartList/:productId')
  async removeFromCart(
    @Param('productId') productId: number,
    @Param('userId') userId: number,
  ) {
    await this.cartService.deleteProductFromCart(productId, userId);
    return { message: 'Product removed from cart successfully' };
  }

  @UseGuards(CartGuard)
  @Patch(':userId/:productId/increase-quantity')
  async increaseCartItemQuantity(
    @Param('userId') userId: number,
    @Param('productId') productId: number,
  ) {
    await this.cartService.increaseCartItemQuantity(userId, productId);
    return { message: 'Cart item quantity increased successfully' };
  }

  @UseGuards(CartGuard)
  @Patch(':userId/:productId/decrease-quantity')
  async decreaseCartItemQuantity(
    @Param('userId') userId: number,
    @Param('productId') productId: number,
  ) {
    await this.cartService.decreaseCartItemQuantity(userId, productId);
    return { message: 'Cart item quantity decreased successfully' };
  }

  @Get(':userId/items')
  async getUserCartItems(@Param('userId') userId: number) {
    return this.cartService.constructItemsArray(userId);
  }

  @UseGuards(CartGuard)
  @Get('user/:userId')
  async findCartByUserId(@Param('userId') userId: string) {
    try {
      const cartList = await this.cartService.findCartByUserId(
        parseInt(userId, 10),
      );
      return { cartList };
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
