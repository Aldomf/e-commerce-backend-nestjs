import { Controller } from '@nestjs/common';
import { ShippingAddressService } from './shipping-address.service';

@Controller('shipping-address')
export class ShippingAddressController {
  constructor(private readonly shippingAddressService: ShippingAddressService) {}
}
