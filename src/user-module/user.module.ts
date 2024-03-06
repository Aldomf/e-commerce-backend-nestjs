import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { ProductModule } from 'src/product-module/product.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), ProductModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService, TypeOrmModule.forFeature([User])],
})
export class UserModule {}
