import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Activity } from "./activity.entity";
import { Base } from "./base.entity";
import {
  UserTypeEnum,
  ProfileStatusEnum,
  EmailStatusEnum,
} from "../utils/types/user.type";
import { Product } from "./product.entity";

@Entity()
export class User extends Base {
  @Column({ unique: true, nullable: false })
  name: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ unique: true, nullable: true })
  pan: number;

  @Column({ nullable: true })
  gst: string;

  @Column({ nullable: true })
  bankName: string;

  @Column({ nullable: true })
  accountNumber: string;

  @Column({ nullable: true })
  accountHolderName: string;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  mobileNumber: string;

  @Column({ nullable: true })
  password: string;

  @Column({ type: "enum", enum: UserTypeEnum, default: UserTypeEnum.Seller })
  userType: UserTypeEnum;

  @Column({
    type: "enum",
    enum: EmailStatusEnum,
    default: EmailStatusEnum.Unverified,
  })
  emailStatus: string;

  @Column({
    type: "enum",
    enum: ProfileStatusEnum,
    default: ProfileStatusEnum.Completed,
  })
  profileStatus: string;

  @OneToMany(() => Activity, (activity) => activity.user)
  activity: Activity;
  @OneToMany(() => Product, (product) => product.user)
  product: Product;
}
