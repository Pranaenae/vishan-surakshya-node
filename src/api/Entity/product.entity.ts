import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Activity } from "./activity.entity";
import { Base } from "./base.entity";
import { User } from "./user.entity";

@Entity()
export class Product extends Base {
  @Column()
  name: string;
  @Column()
  description: string;
  @Column()
  image: string;
  @Column()
  deliveryTime: Date;
  @Column()
  deliveryCharge: Number;
  @Column()
  deliveryAddress: string;
  @Column({ default: true })
  toggleStatus: Boolean;

  @OneToMany(() => Activity, (activity) => activity.product)
  activity: Activity;
  @ManyToOne(() => User, (user) => user.product)
  @JoinColumn({ name: "user_id" })
  user: User;
}
