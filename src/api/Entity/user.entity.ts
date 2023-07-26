import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Transaction } from "./transaction.entity";
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
  pan: string;

  @Column({ nullable: true })
  gst: string;

  @Column({ name: "bank_name", nullable: true })
  bankName: string;

  @Column({ name: "account_number", nullable: true })
  accountNumber: string;

  @Column({ name: "account_holder_name", nullable: true })
  accountHolderName: string;

  @Column({ nullable: true })
  address: string;

  @Column({ name: "mobile_number", nullable: true })
  mobileNumber: string;

  @Column({ nullable: true })
  password: string;

  @Column({
    name: "user_type",
    type: "enum",
    enum: UserTypeEnum,
    default: UserTypeEnum.Seller,
  })
  userType: UserTypeEnum;

  @Column({
    name: "email_status",
    type: "enum",
    enum: EmailStatusEnum,
    default: EmailStatusEnum.Unverified,
  })
  emailStatus: string;

  @Column({
    name: "profile_status",
    type: "enum",
    enum: ProfileStatusEnum,
    default: ProfileStatusEnum.Completed,
  })
  profileStatus: string;

  @OneToMany(() => Transaction, (transaction) => transaction.user)
  transaction: Transaction;

  @OneToMany(() => Product, (product) => product.user)
  product: Product;
}
