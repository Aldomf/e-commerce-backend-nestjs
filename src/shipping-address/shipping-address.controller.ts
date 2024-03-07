import { Controller, Post, Body, Param, Patch, Get } from '@nestjs/common';
import { ShippingAddressService } from './shipping-address.service';
import { CreateShippingAddressDto } from './dto/createShippingAddress.dto';
import { UpdateShippingAddressDto } from './dto/updateShippingAddress.dto';
import { ShippingAddress } from './entities/shippingAddress.entity';

@Controller('shipping-address')
export class ShippingAddressController {
  constructor(
    private readonly shippingAddressService: ShippingAddressService,
  ) {}

  @Post(':userId')
  async createShippingAddress(
    @Param('userId') userId: number,
    @Body() createShippingAddressDto: CreateShippingAddressDto,
  ) {
    const shippingAddress = await this.shippingAddressService.create(
      userId,
      createShippingAddressDto,
    );
    return shippingAddress;
  }

  @Patch(':userId')
  async updateShippingAddress(
    @Param('userId') userId: number,
    @Body() updateShippingAddressDto: UpdateShippingAddressDto,
  ) {
    const shippingAddress = await this.shippingAddressService.update(
      userId,
      updateShippingAddressDto,
    );
    return shippingAddress;
  }

  @Get(':userId')
  async findOne(@Param('userId') userId: number): Promise<ShippingAddress> {
    return this.shippingAddressService.findOne(userId);
  }
}
