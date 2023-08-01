import { Column, Entity, ManyToOne } from "typeorm";
import { ENegotiation } from "../utils/types/negotiation.type";
import { Base } from "./base.entity";
import { Product } from "./product.entity";
import { User } from "./user.entity";

@Entity()
export class Negotiation extends Base {
  @ManyToOne(() => Product)
  product: Product;

  @ManyToOne(() => User)
  user: User;

  @Column({ name: "buyer_negotation_price" })
  buyerNegotiationPrice: number;

  @Column({ name: "buyer_negotiation_delivery_cost" })
  buyerNegotiationDeliveryCost: number;

  @Column()
  remarks: string;

  @Column({
    name: "negotiation_status",
    type: "enum",
    enum: ENegotiation,
    default: ENegotiation.NEGOTIATE,
  })
  negotiationStatus: ENegotiation;

  @Column({ name: "seller_negotation_price", nullable: true })
  sellerNegotiationPrice: number;

  @Column({ name: "seller_negotiation_delivery_cost", nullable: true })
  sellerNegotiationDeliveryCost: number;

  @Column({ name: "final_price", nullable: true })
  finalPrice: number;

  @Column({ name: "final_delivery_charge", nullable: true })
  finalDeliveryCost: number;
}
