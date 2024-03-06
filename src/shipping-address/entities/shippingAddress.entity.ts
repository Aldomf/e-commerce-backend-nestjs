import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from 'src/user-module/entities/user.entity';

@Entity()
export class ShippingAddress {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  street: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column()
  postalCode: string;

  @Column()
  mobile: string;

  @ManyToOne(() => User, (user) => user.shippingAddresses)
  user: User;
}
