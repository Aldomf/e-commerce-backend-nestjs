import { Controller, Post, Get, Param, UseGuards } from '@nestjs/common';
import { StripeService } from './stripe.service';
import { AuthGuard } from 'src/auth-module/guard/auth.guard';

@Controller('checkout')
export class StripeController {
  constructor(private readonly stripeService: StripeService) {}

  @UseGuards(AuthGuard)
  @Post('/session/:userId')
  async createCheckoutSession(@Param('userId') userId: number) {
    try {
      const session = await this.stripeService.createCheckoutSession(userId);
      return { session }; // Return the session object created by Stripe
    } catch (error) {
      return { error: error.message }; // Return any errors encountered
    }
  }

  @UseGuards(AuthGuard)
  @Get('/success')
  handleSuccess() {
    return 'Payment successful!';
  }

  @UseGuards(AuthGuard)
  @Get('/cancel')
  handleCancel() {
    return 'Payment canceled!';
  }
}
