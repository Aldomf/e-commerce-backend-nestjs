import { Body, Controller, Post } from '@nestjs/common';
import { StripeService } from 'src/stripe/stripe.service';

@Controller('webhook')
export class WebhookController {
  constructor(private readonly stripeService: StripeService) {}

  @Post('stripe')
  handleStripeWebhook(@Body() payload: any) {
    // Forward the payload to the Stripe service for processing
    this.stripeService.handlePaymentWebhook(payload);
  }
}
