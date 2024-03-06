import { Module } from '@nestjs/common';
import { AuthModule } from './auth-module/auth.module';
import { ProductModule } from './product-module/product.module';
import { OrderModuleModule } from './order-module/order.module';
import { UserModule } from './user-module/user.module';
import { AdminModuleModule } from './admin-module/admin-module.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryModule } from './category/category.module';
import { CartModule } from './cart/cart.module';
import { PaymentModule } from './payment/payment.module';
import { StripeModule } from './stripe/stripe.module';
import { WebhookModule } from './webhook/webhook.module';
import { ShippingAddressModule } from './shipping-address/shipping-address.module';

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
    OrderModuleModule,
    UserModule,
    AdminModuleModule,
    CategoryModule,
    CartModule,
    PaymentModule,
    StripeModule,
    WebhookModule,
    ShippingAddressModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
