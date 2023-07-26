import path from "path";
import datasource from "../../config/ormConfig";
import { Image } from "../Entity/image.entity";
import { Product } from "../Entity/product.entity";
import { IProduct } from "../utils/types/product.type";
import jwt from "jsonwebtoken";
import AppErrorUtil from "../utils/appError";
const productRepository = datasource.getRepository(Product);
const imageRepo = datasource.getRepository(Image);

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
  product.deliveryTime = deliveryTime;
  product.deliveryCharge = deliveryCharge;
  product.deliveryAddress = deliveryAddress;
  product.user = user;

  const savedProduct = await productRepository.save(product);
  const image = new Image();
  const savedImages = await Promise.all(
    file.map(async (file: any) => {
      const data = path.join(__dirname, "../../uploads", file.originalname);
      image.imagePath = data;
      image.product = savedProduct;
      return await imageRepo.save(image);
    })
  );
  const result = await productRepository.findOneBy({ id: savedProduct.id });
  console.log({ result });
  return result;
  // return { ...savedProduct, images: savedImages };
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
