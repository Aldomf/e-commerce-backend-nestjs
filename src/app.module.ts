import { Module } from '@nestjs/common';
import { AuthModule } from './auth-module/auth.module';
import { ProductModule } from './product-module/product.module';
import { OrderModule } from './order-module/order.module';
import { UserModule } from './user-module/user.module';
import { AdminModule } from './admin-module/admin.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryModule } from './category/category.module';
import { CartModule } from './cart/cart.module';
import { PaymentModule } from './payment/payment.module';
import { StripeModule } from './stripe/stripe.module';
import { WebhookModule } from './webhook/webhook.module';
import { ShippingAddressModule } from './shipping-address/shipping-address.module';
import { WishlistModule } from './wishlist/wishlist.module';
import { ReviewModule } from './review/review.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'Aldosql',
      database: 'e-commerce',
      autoLoadEntities: true,
      synchronize: true,
    }),
    AuthModule,
    ProductModule,
    OrderModule,
    UserModule,
    AdminModule,
    CategoryModule,
    CartModule,
    PaymentModule,
    StripeModule,
    WebhookModule,
    ShippingAddressModule,
    WishlistModule,
    ReviewModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
