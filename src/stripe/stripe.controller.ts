import { Controller, Post, Body, Get } from '@nestjs/common';
import { StripeService } from './stripe.service';

@Controller('checkout')
export class StripeController {
  constructor(private readonly stripeService: StripeService) {}

  @Post('/session')
  async createCheckoutSession(@Body('userId') userId: number) {
    try {
      const session = await this.stripeService.createCheckoutSession(userId);
      return { session }; // Return the session object created by Stripe
    } catch (error) {
      return { error: error.message }; // Return any errors encountered
    }
  }

  @Get('/success')
  handleSuccess() {
    return 'Payment successful!';
  }

  @Get('/cancel')
  handleCancel() {
    return 'Payment canceled!';
  }
}
