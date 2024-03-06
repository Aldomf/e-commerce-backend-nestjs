import { Module, forwardRef } from '@nestjs/common';
import { StripeService } from './stripe.service';
import { CartModule } from 'src/cart/cart.module';
import { StripeController } from './stripe.controller';
import { PaymentModule } from 'src/payment/payment.module';

@Module({
  imports: [CartModule, forwardRef(() => PaymentModule)],
  controllers: [StripeController],
  providers: [StripeService],
  exports: [StripeService],
})
export class StripeModule {}
