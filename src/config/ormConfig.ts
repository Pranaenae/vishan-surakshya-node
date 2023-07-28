import { DataSource } from "typeorm";
import { User } from "../api/entity/user.entity";
import { Product } from "../api/entity/product.entity";
import { Transaction } from "../api/entity/transaction.entity";
import { Litigation } from "../api/entity/litigation.entity";
import { Image } from "../api/entity/image.entity";
import { Negotiation } from "../api/entity/negotiation.entity";

const datasource = new DataSource({
  type: "mysql",
  host: process.env.HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  synchronize: true,
  entities: [User, Product, Transaction, Litigation, Image, Negotiation],

  // logging: true,
});

export default datasource;
