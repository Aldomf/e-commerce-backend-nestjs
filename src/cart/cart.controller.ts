import { Controller, Post, Param, Delete, Get, Patch } from '@nestjs/common';
import { CartService } from './cart.service';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cartService.constructItemsArray(+id);
  }

  @Post(':userId/add-product-to-cartList/:productId')
  async addToCart(
    @Param('productId') productId: number,
    @Param('userId') userId: number,
  ) {
    await this.cartService.addProductToCart(productId, userId);
    return { message: 'Product added to cart successfully' };
  }

  @Delete(':userId/delete-product-from-cartList/:productId')
  async removeFromCart(
    @Param('productId') productId: number,
    @Param('userId') userId: number,
  ) {
    await this.cartService.deleteProductFromCart(productId, userId);
    return { message: 'Product removed from cart successfully' };
  }

  @Patch(':userId/:productId/increase-quantity')
  async increaseCartItemQuantity(
    @Param('userId') userId: number,
    @Param('productId') productId: number,
  ) {
    await this.cartService.increaseCartItemQuantity(userId, productId);
    return { message: 'Cart item quantity increased successfully' };
  }

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
}
