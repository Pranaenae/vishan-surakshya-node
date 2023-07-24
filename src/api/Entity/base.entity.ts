import {
  BaseEntity,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export abstract class Base extends BaseEntity {
  @PrimaryGeneratedColumn("increment", { type: "bigint" })
  id: string;

  @CreateDateColumn({ name: "created_at", select: false })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at", select: false })
  updatedAt: Date;

  @DeleteDateColumn({ name: "deleted_at", select: false, nullable: true })
  deletedAt: Date;
}
