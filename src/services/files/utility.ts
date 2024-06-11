import path from "path";
import { Folders } from "./constants.js";
import { FilesType } from "../../types/files.js";

function generateKey(
  personId: string,
  file: Express.Multer.File,
  folder: Folders
): { key: string; folderPath: string } {
  const key = path.join(personId, `${folder} /${file.originalname}`);
  const folderPath = path.join(personId, `${folder}`);
  return { key, folderPath };
}

const generateKeyForDisabilityCard = (
  personId: string,
  file: Express.Multer.File,
  disabilityId: string
) => {
  const folderPath = personId + "/" + Folders.DISABILITY_CARDS;
  const key = folderPath + "/" + disabilityId + "/" + file.originalname;
  return { key, folderPath };
};

const getFile = (files: FilesType, folder: Folders) => {
  return Object.entries(files).filter((data) => {
    if (data[1][0].fieldname === folder) return data;
  })[0][1][0];
  //[0] getting the 1st {  [fieldname: string]: Express.Multer.File[];}
  //[1] getting the array of files
  //[0] getting the 1st file
};
export { generateKey, generateKeyForDisabilityCard, getFile };
