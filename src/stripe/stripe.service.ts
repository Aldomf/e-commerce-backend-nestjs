import { Injectable } from '@nestjs/common';
import { CartService } from 'src/cart/cart.service';
import { PaymentService } from 'src/payment/payment.service';
import Stripe from 'stripe';

@Injectable()
export class StripeService {
  private stripe: Stripe;

  constructor(
    private readonly cartService: CartService,
    private readonly paymentService: PaymentService,
  ) {
    this.stripe = new Stripe(process.env.STRIPE_API_KEY, {
      apiVersion: '2023-10-16', // Use the Stripe API version you want to work with
    });
  }

  async createCheckoutSession(userId: number) {
    console.log(userId);
    const items = await this.cartService.constructItemsArray(userId);
    const session = await this.stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: items.map((item) => ({
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.name,
            description: item.description,
            images: [item.image],
          },
          unit_amount: parseFloat((item.price * 100).toFixed(2)),
        },
        quantity: item.quantity,
      })),
      metadata: {
        userId,
      },
      mode: 'payment',
      success_url: 'http://localhost:3000/api/checkout/success',
      cancel_url: 'http://localhost:3000/api/checkout/cancel',
      client_reference_id: userId.toString(),
    });

    return session;
  }

  async handlePaymentWebhook(payload: any) {
    // Log the entire payload received from Stripe
    console.log('Received Stripe Webhook Payload:', payload);

    // Extract the event type
    const eventType = payload.type;

    // Handle payment succeeded event
    if (eventType === 'checkout.session.completed') {
      // Call handlePaymentSuccess method to clear user's cart
      await this.paymentService.handlePaymentSuccess(payload);
    }
    // Add more conditions to handle other webhook events if needed
  }
}
