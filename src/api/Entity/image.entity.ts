import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { Base } from "./base.entity";
import { Product } from "./product.entity";
import { Litigation } from "./litigation.entity";

@Entity()
export class Image extends Base {
  @Column({ name: "image_path" })
  imagePath: string;

  @ManyToOne(() => Litigation, (litigation) => litigation.images, {
    nullable: true,
  })
  @JoinColumn({ name: "litigation_id" })
  litigation: Litigation;

  @ManyToOne(() => Product, (product) => product.images, { nullable: true })
  @JoinColumn({ name: "product_id" })
  product: Product;
}
