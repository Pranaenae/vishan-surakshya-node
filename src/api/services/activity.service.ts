import datasource from "../../config/ormConfig";
import { Activity } from "../Entity/activity.entity";
import { Product } from "../Entity/product.entity";
import { ILogoptions } from "../utils/types/log.type";
const activityRepository = datasource.getRepository(Activity);
const productRepository = datasource.getRepository(Product);
export const logEntry = async (details: ILogoptions) => {
  const { description, user, product } = details;
  console.log({ user });
  console.log({ product });
  const result: any = new Activity();

  result.description = description;
  result.user = user;
  result.product = product;
  const response = await activityRepository.save(result);
  return response;
};

export const logByProductId = async (data: any) => {
  console.log({ data });
  const id = data.id;

  console.log({ id });
  const result = await datasource
    .getRepository(Activity)
    .createQueryBuilder("activities")
    .where("activities.product=:id", { id: id })
    .getMany();

  console.log({ result });
  return result;
};
