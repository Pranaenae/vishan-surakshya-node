import datasource from "../../config/ormConfig";
import { Transaction } from "../entity/transaction.entity";
import { Product } from "../entity/product.entity";
import { ILogoptions } from "../utils/types/log.type";
import { IProduct } from "../utils/types/product.type";

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
    .getRepository(Product)
    .createQueryBuilder("product")
    .leftJoinAndSelect("product.transaction", "transaction")
    .leftJoinAndSelect("product.user", "user")
    .leftJoinAndSelect("product.images", "image")
    .where("product.id=:id", { id: id })
    .getOne();

  console.log({ result });
  return result;
};

export const accept = async (payload: IProduct, user: any) => {
  const getProduct = await productRepository.findOneBy({ id: payload.id });
  let result;
  if (getProduct) {
    getProduct.isAccepted = true;
    getProduct.acceptedBy = user;
    result = await productRepository.save(getProduct);
  }
  return result;
};
