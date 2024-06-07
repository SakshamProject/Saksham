import path from "path";

function generateKey(
  personId: string,
  file: Express.Multer.File
): { key: string; folderPath: string } {
  const key = path.join(personId, `${file.fieldname}/${file.originalname}`);
  //   ${path.extname(file.originalname)} to extract extention with dot
  const folderPath = path.join(personId, `${file.fieldname}`);
  return { key, folderPath };
}
export { generateKey };
