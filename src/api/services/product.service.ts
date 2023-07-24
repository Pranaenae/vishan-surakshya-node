import datasource from "../../config/ormConfig";
import { Product } from "../Entity/product.entity";
import { IProduct } from "../utils/types/product.type";
import jwt from "jsonwebtoken";
const productRepository = datasource.getRepository(Product);

export const create = async (data: IProduct, file: any) => {
  const {
    user,
    name,
    description,
    deliveryTime,
    deliveryCharge,
    deliveryAddress,
  } = data;
  console.log(user);

  const product = new Product();
  product.name = name;
  product.description = description;
  product.image = file?.filename;
  product.deliveryTime = deliveryTime;
  product.deliveryCharge = deliveryCharge;
  product.deliveryAddress = deliveryAddress;
  product.user = user;

  const result = await productRepository.save(product);

  // if (result) {
  //   const payload = {
  //     productId: result._id,
  //   };
  //   const secretKey = process.env.JWT_SECRET_KEY
  //     ? process.env.JWT_SECRET_KEY
  //     : "";
  //   const token = jwt.sign(payload, secretKey);
  //   return { result, token };
  // }
  return result;
};

export const update = async (data: IProduct) => {
  const {
    id,
    name,
    description,
    deliveryTime,
    deliveryCharge,
    deliveryAddress,
  } = data;

  const result = await productRepository
    .createQueryBuilder()
    .update(Product)
    .set({
      name: name,
      description: description,
      deliveryTime: deliveryTime,
      deliveryCharge: deliveryCharge,
      deliveryAddress: deliveryAddress,
    })
    .where("id=:id", { id })
    .execute();

  return result;
};

export const get = async (data: IProduct) => {
  const { id } = data;

  const result = await productRepository.findOneBy({ id: id });
  return result;
};

export const getAll = async () => {
  const result = await productRepository.find();
  return result;
};

export const del = async (data: IProduct) => {
  const { id } = data;

  const result = await datasource
    .createQueryBuilder()
    .delete()
    .from(Product)
    .where("id=:id", { id })
    .execute();
  return result;
};

export const toggle = async (data: IProduct) => {
  const { id, toggleStatus } = data;

  const result = await datasource
    .createQueryBuilder()
    .update(Product)
    .set({ toggleStatus: toggleStatus })
    .where("id = :id", { id })
    .execute();
  return result;
};
