import { Module } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewController } from './review.controller';
import { Review } from './entities/review.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user-module/user.module';
import { ProductModule } from 'src/product-module/product.module';

@Module({
  imports: [TypeOrmModule.forFeature([Review]), UserModule, ProductModule],
  controllers: [ReviewController],
  providers: [ReviewService],
})
export class ReviewModule {}
