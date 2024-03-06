import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { Order } from './entities/order.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user-module/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Order]), UserModule],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModuleModule {}
