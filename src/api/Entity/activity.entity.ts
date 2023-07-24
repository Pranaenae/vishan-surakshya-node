import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Product } from "./product.entity";
import { User } from "./user.entity";
import { Base } from "./base.entity";

@Entity()
export class Activity extends Base {
  @Column()
  description: string;

  @ManyToOne(() => User, (user) => user.activity)
  @JoinColumn({ name: "user_id" })
  user: User;

  @ManyToOne(() => Product, (product) => product.activity)
  @JoinColumn({ name: "product_id" })
  product: Product;
}
