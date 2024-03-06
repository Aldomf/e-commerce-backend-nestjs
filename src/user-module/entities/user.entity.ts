// User entity
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Role } from 'src/common/enums/role.enum';
import { Product } from 'src/product-module/entities/product.entity';
import { Order } from 'src/order-module/entities/order.entity';
import { ShippingAddress } from 'src/shipping-address/entities/shippingAddress.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ type: 'enum', enum: Role, array: true, default: [Role.User] })
  role: Role[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  // Many-to-Many relationship with products in wishlist
  @ManyToMany(() => Product, { cascade: true })
  @JoinTable()
  wishlist: Product[];

  // Many-to-Many relationship with products in cart
  @ManyToMany(() => Product, { cascade: true })
  @JoinTable()
  cartList: Product[];

  // One-to-Many relationship with user's orders
  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];

  // One-to-Many relationship with user's shipping addresses
  @OneToMany(() => ShippingAddress, (shippingAddress) => shippingAddress.user)
  shippingAddresses: ShippingAddress[];
}
