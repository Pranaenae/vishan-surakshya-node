import { DataSource } from "typeorm";
import { User } from "../api/Entity/user.entity";
import { Product } from "../api/Entity/product.entity";
import { Activity } from "../api/Entity/activity.entity";

const datasource = new DataSource({
  type: "mysql",
  host: process.env.HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  synchronize: true,
  // logging: true,
  entities: [User, Product, Activity],
});

export default datasource;
