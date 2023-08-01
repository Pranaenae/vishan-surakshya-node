import datasource from "../../config/ormConfig";
import { Negotiation } from "../entity/negotiation.entity";
import { Product } from "../entity/product.entity";
import { User } from "../entity/user.entity";
import { INegotiation } from "../utils/types/negotiation.type";

const productRepo = datasource.getRepository(Product);
const userRepo = datasource.getRepository(User);
const negotiationRepo = datasource.getRepository(Negotiation);

export const create = async (payload: INegotiation) => {
  const {
    product,
    user,
    buyerNegotiationPrice,
    buyerNegotiationDeliveryCost,
    remarks,
  } = payload;

  const getUser = await userRepo.findOneBy({ id: user });
  const getProduct = await productRepo.findOneBy({ id: product });

  const negotiation = new Negotiation();
  negotiation.buyerNegotiationPrice = buyerNegotiationPrice;
  negotiation.buyerNegotiationDeliveryCost = buyerNegotiationDeliveryCost;
  negotiation.remarks = remarks;
  if (getUser) negotiation.user = getUser;
  if (getProduct) negotiation.product = getProduct;

  //   negotiation.sellerNegotiationPrice = getProduct?.price;
  //   negotiation.sellerNegotiationDeliveryCost = getProduct?.deliveryCharge;

  let result = await negotiationRepo.save(negotiation);
  return result;
};

export const get = async (payload: INegotiation) => {
  const result = await negotiationRepo.findOneBy({ id: payload.id });
  return result;
};

export const renegotiate = async (payload: INegotiation) => {
  const {
    id,
    buyerNegotiationPrice,
    buyerNegotiationDeliveryCost,
    sellerNegotiationPrice,
    sellerNegotiationDeliveryCost,
  } = payload;

  const getNegotiation = await negotiationRepo.findOneBy({ id });

  let result;

  if (getNegotiation) {
    // if buyer negotiates
    getNegotiation.buyerNegotiationPrice = buyerNegotiationPrice;
    getNegotiation.buyerNegotiationDeliveryCost = buyerNegotiationDeliveryCost;

    // if seller negotiates
    getNegotiation.sellerNegotiationPrice = sellerNegotiationPrice;
    getNegotiation.sellerNegotiationDeliveryCost =
      sellerNegotiationDeliveryCost;

    result = await negotiationRepo.save(getNegotiation);
  }
  return result;
};

export const changeStatus = async (payload: INegotiation) => {
  const { id, negotiationStatus } = payload;

  const getNegotiation = await negotiationRepo.findOneBy({ id });

  let result;

  if (getNegotiation) {
    getNegotiation.negotiationStatus = negotiationStatus;
    result = await negotiationRepo.save(getNegotiation);
  }
  return result;
};
