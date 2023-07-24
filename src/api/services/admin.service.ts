import datasource from "../../config/ormConfig";
import { User } from "../Entity/user.entity";
import { UserTypeEnum } from "../utils/types/user.type";
const userRepositoy = datasource.getRepository(User);

export const getUsers = async (data: any) => {
  const { userType } = data;
  let user;
  if (userType === "all") {
    user = await userRepositoy.find({});
  } else if (userType === "seller") {
    user = await userRepositoy.findBy({ userType: UserTypeEnum.Seller });
  } else {
    user = await userRepositoy.findBy({ userType: UserTypeEnum.Buyer });
  }
  return user;
};
