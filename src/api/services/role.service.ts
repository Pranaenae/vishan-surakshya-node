// import { Role } from "../models/role.model";
// import { IRole } from "../utils/types/role.type";

// export const create = async (data: IRole) => {
//   const { name } = data;

//   const role = new Role({
//     name,
//   });

//   const result = await role.save();
//   return result;
// };

// export const update = async (data: IRole) => {
//   const { _id, name } = data;

//   const result = await Role.findByIdAndUpdate(_id, { name });
//   return result;
// };

// export const get = async (data: IRole) => {
//   const { _id } = data;

//   const result = await Role.findById(_id);
//   return result;
// };

// export const getAll = async () => {
//   const result = await Role.find();
//   return result;
// };

// export const del = async (data: IRole) => {
//   const { _id } = data;

//   const result = await Role.findByIdAndDelete(_id);
//   return result;
// };

// export const toggle = async (data: IRole) => {
//   const { _id, status } = data;

//   const result = await Role.findByIdAndUpdate(_id, { status });
//   return result;
// };
