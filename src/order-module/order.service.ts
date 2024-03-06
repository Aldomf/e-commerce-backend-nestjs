import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { UserService } from 'src/user-module/user.service';
import { Repository } from 'typeorm';
import { Status } from 'src/common/enums/status.enum';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    private readonly userService: UserService,
  ) {}

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    const order = this.orderRepository.create(createOrderDto);
    return this.orderRepository.save(order);
  }

  async findAll(): Promise<Order[]> {
    return this.orderRepository.find({ relations: ['products'] });
  }

  async findOne(id: number): Promise<Order | undefined> {
    return this.orderRepository.findOne({
      where: { id },
      relations: ['products'],
    });
  }

  async update(id: number, updateOrderDto: UpdateOrderDto): Promise<void> {
    await this.orderRepository.update(id, updateOrderDto);
  }

  async remove(id: number): Promise<void> {
    await this.orderRepository.softDelete(id);
  }

  async updateOrderStatus(id: number, status: Status): Promise<Order> {
    const order = await this.findOne(id);
    if (!order) {
      throw new Error('Order not found');
    }
    order.orderStatus = status;
    return this.orderRepository.save(order);
  }
}
