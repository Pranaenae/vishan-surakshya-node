import { User } from "../models/user.model";

export const getUsers = async (data: any) => {
  const { userType } = data;
  let user;
  if (userType === "all") {
    user = await User.find({}).exec();
  } else if (userType === "seller") {
    user = await User.find({ userType: "seller" }).exec();
  } else {
    user = await User.find({ userType: "buyer" }).exec();
  }
  return user;
};
