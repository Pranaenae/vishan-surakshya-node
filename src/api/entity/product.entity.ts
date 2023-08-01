import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
} from "typeorm";
import { Transaction } from "./transaction.entity";
import { Base } from "./base.entity";
import { User } from "./user.entity";
import { EOrderTracking } from "../utils/types/trackOrder.enum";
import { Litigation } from "./litigation.entity";
import { Image } from "./image.entity";

@Entity()
export class Product extends Base {
  @Column()
  name: string;

  @Column()
  price: number;

  @Column()
  description: string;

  @Column({ name: "delivery_time" })
  deliveryTime: Date;

  @Column({ name: "delivery_charge" })
  deliveryCharge: number;

  @Column({ name: "delivery_address" })
  deliveryAddress: string;

  @Column({
    name: "order_status",
    type: "enum",
    enum: EOrderTracking,
    default: EOrderTracking.Pending,
  })
  orderStatus: EOrderTracking;

  @OneToMany(() => Transaction, (transaction) => transaction.product)
  transaction: Transaction;

  @ManyToOne(() => User, (user) => user.product)
  buyer: User;

  @OneToOne(() => Litigation, (litigation) => litigation.product)
  litigation: Litigation;

  @OneToMany(() => Image, (image) => image.product, { eager: true })
  images: Image;

  @Column({ name: "is_accepted", default: false })
  isAccepted: boolean;

  @OneToOne(() => User)
  @JoinColumn({ name: "accepted_by" })
  acceptedBy: User;
}