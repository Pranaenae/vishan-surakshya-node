export const create = async (data) => {
  // const isUser = await UserModel.count({
  //   where: { username: data.username, email: data.email },
  // });
  // var result = false;
  // if (!isUser) {
  //   const user = await UserModel.create({ ...data, raw: true });
  //   result = user;
  // }
  // return result;
};

module.exports = {
  create,
};
