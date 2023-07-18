import path from "path";

export const get = async (data: { filename: string }) => {
  const { filename } = data;
  const image = path.join(__dirname, "../../uploads/", filename);
  console.log({ image });
  return path.normalize(image);
};
