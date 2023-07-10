import { User } from "../models/user.model";

export const createUser = async (data: any) => {
  const { username, email, password } = data;

  const user = new User({
    username,
    email,
    password,
  });

  let result = await user.save();
  return result;
};

export const test = async () => {
  let x = "aaa";
  return x;
};
