import datasource from "../../config/ormConfig";
import { Transaction } from "../entity/transaction.entity";
import { Product } from "../entity/product.entity";
import { ILogoptions } from "../utils/types/log.type";

const activityRepository = datasource.getRepository(Transaction);
const productRepository = datasource.getRepository(Product);

export const logEntry = async (details: ILogoptions) => {
  const { activity, user, product } = details;
  console.log({ user });
  console.log({ product });
  const result: any = new Transaction();

  result.activity = activity;
  result.user = user;
  result.product = product;
  const response = await activityRepository.save(result);
  return response;
};

export const transactionByProductId = async (data: any) => {
  console.log({ data });
  const id = data.id;

  console.log({ id });
  const result = await datasource
    .getRepository(Transaction)
    .createQueryBuilder("activities")
    .where("activities.product=:id", { id: id })
    .getMany();

  console.log({ result });
  return result;
};
