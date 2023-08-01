import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { Product } from "./product.entity";
import { User } from "./user.entity";
import { Base } from "./base.entity";

@Entity()
export class Transaction extends Base {
  @Column()
  activity: string;

  @ManyToOne(() => User, (user) => user.transaction)
  @JoinColumn({ name: "user_id" })
  user: User;

  @ManyToOne(() => Product, (product) => product.transaction)
  @JoinColumn({ name: "product_id" })
  product: Product;
}
