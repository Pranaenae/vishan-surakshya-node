import { Column, Entity, JoinColumn, OneToMany, OneToOne } from "typeorm";
import { Base } from "./base.entity";
import { Product } from "./product.entity";
import { Image } from "./image.entity";

@Entity()
export class Litigation extends Base {
  @Column()
  reason: string;

  @Column()
  issue: string;

  @OneToMany(() => Image, (image) => image.litigation, {
    nullable: true,
    eager: true,
  })
  images: Image;

  @OneToOne(() => Product, (product) => product.litigation, { nullable: true })
  @JoinColumn({ name: "product_id" })
  product: Product;
}
