import { Product } from "../models/product.mode";
import { IProduct } from "../utils/types/product.type";
import jwt from "jsonwebtoken";

export const create = async (data: IProduct, file: any) => {
  const { name, description, deliveryTime, deliveryCharge, deliveryAddress } =
    data;

  const product = new Product({
    name,
    description,
    image: file?.filename,
    deliveryTime,
    deliveryCharge,
    deliveryAddress,
  });

  const result = await product.save();
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
    _id,
    name,
    description,
    deliveryTime,
    deliveryCharge,
    deliveryAddress,
  } = data;

  const result = await Product.findByIdAndUpdate(_id, {
    name,
    description,
    deliveryTime,
    deliveryCharge,
    deliveryAddress,
  });
  return result;
};

export const get = async (data: IProduct) => {
  const { _id } = data;

  const result = await Product.findById(_id);
  return result;
};

export const getAll = async () => {
  const result = await Product.find();
  return result;
};

export const del = async (data: IProduct) => {
  const { _id } = data;

  const result = await Product.findByIdAndDelete(_id);
  return result;
};

export const toggle = async (data: IProduct) => {
  const { _id, toggleStatus } = data;

  const result = await Product.findByIdAndUpdate(_id, { toggleStatus });
  return result;
};
