import path from "path";
import datasource from "../../config/ormConfig";
import { Litigation } from "../Entity/litigation.entity";
import { ILitigationRequest } from "../utils/types/litigation.types";
import { Product } from "../Entity/product.entity";
import { Image } from "../Entity/image.entity";

const litigationRepo = datasource.getRepository(Litigation);
const productRepository = datasource.getRepository(Product);
const imageRepo = datasource.getRepository(Image);
export const createLitigation = async (data: ILitigationRequest) => {
  let finalLitigation;
  const { id, reason, issue, doc } = data;
  const product = await productRepository.findOneBy({ id: id });
  // const docPaths = doc.map(async (file: any) => {
  //   const data = path.join(__dirname, "../../uploads", file.originalname);
  //   image.imagePath = data;
  //   result =await imageRepo.save(image)

  // });
  // return docPaths
  // const docPath = path.join(__dirname, "../../uploads");
  const newLitigation = new Litigation();
  newLitigation.reason = reason;
  newLitigation.issue = issue;
  console.log({ newLitigation });
  if (product) newLitigation.product = product;

  const savedLitigation = await litigationRepo.save(newLitigation);
  const image = new Image();
  const docPaths = await Promise.all(
    doc.map(async (file: any) => {
      const data = path.join(__dirname, "../../uploads", file.originalname);
      image.imagePath = data;
      image.litigation = savedLitigation;
      const result = await imageRepo.save(image);
    })
  );
  finalLitigation = await litigationRepo.find({
    where: { id: savedLitigation.id },
  });
  return finalLitigation;
};
