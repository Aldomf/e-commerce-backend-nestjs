import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  BadRequestException,
  UseGuards,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Status } from 'src/common/enums/status.enum';
import { Order } from './entities/order.entity';
import { AuthGuard } from 'src/auth-module/guard/auth.guard';
import { AdminGuard } from 'src/common/guards/admin.guard';
import { UserIdGuard } from 'src/common/guards/userId.guard';

@Controller('orders')
@UseGuards(AuthGuard)
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.create(createOrderDto);
  }

  @Get()
  @UseGuards(AdminGuard)
  findAll() {
    return this.orderService.findAll();
  }

  @Get(':id')
  @UseGuards(AdminGuard)
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(AdminGuard)
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.orderService.update(+id, updateOrderDto);
  }

  @Patch(':id/status')
  @UseGuards(AdminGuard)
  async updateOrderStatus(
    @Param('id') id: string,
    @Body('status') status: Status,
  ): Promise<Order> {
    return this.orderService.updateOrderStatus(+id, status);
  }

  @Delete(':id')
  @UseGuards(AdminGuard)
  remove(@Param('id') id: string) {
    return this.orderService.remove(+id);
  }

  @Get('user/:userId')
  @UseGuards(UserIdGuard)
  async findOrdersByUserId(@Param('userId') userId: string) {
    try {
      const orders = await this.orderService.findOrdersByUserId(
        parseInt(userId, 10),
      );
      return { orders };
    } catch (error) {
      if (
        error instanceof BadRequestException ||
        error instanceof NotFoundException
      ) {
        return { error: error.message };
      }
      throw error; // Let other errors propagate
    }
  }
}
