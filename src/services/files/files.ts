// import prisma from "../database/database.js";
// import {updateUserProfileKeyDB} from "../database/users/update.js";
// import {
//     deleteFile,
//     generateDisablityCardFileKey,
//     generateFileURLResponseFromKey,
//     generateFileURLResponseFromResult,
//     generateFileURLsResponseFromResult,
//     generateKey,
//     saveDisabilityCardFileBufferToS3,
//     saveFileBuffersToS3,
//     saveFileBufferToS3,
// } from "../s3/s3.js";
// import APIError from "../errors/APIError.js";
// import {StatusCodes} from "http-status-codes";
// import {
//     divayangDetailsUpdateFileKeysDB,
//     saveDisabilityDetailsCardKey,
//     updateDivyangProfileKeyDB,
//     updateUDIDCardKeyDB,
// } from "../database/divyangDetails/update.js";
// import log from "../logger/logger.js";
// import {getDivyangDetailsByPersonIdDB, getDivyangDisabilitiesByPersonIdDB,} from "../database/divyangDetails/read.js";
// import {getUserByPersonIdDB} from "../database/users/read.js";
// import {updateDivyangDetailsRequest} from "../../types/divyangDetails/divyangDetailsSchema.js";
// import throwDatabaseError from "../database/utils/errorHandler.js";

// async function getDivyangDetailsDisabilityCardsFileURLS(personId: string) {
//     const disabilityCards: {
//         [id: string]: {
//             key: string;
//             url: string;
//             validUpto: string;
//             expiresInSeconds: number;
//         };
//     }[] = [];
//     const disabilities = await getDivyangDisabilitiesByPersonIdDB(
//         prisma,
//         personId
//     );
//     if (disabilities) {
//         for (const disability of disabilities) {
//             if (disability.disabilityCardFile && disability.id) {
//                 const fileURL = await generateFileURLResponseFromKey(
//                     disability.disabilityCardFile
//                 );
//                 if (fileURL) {
//                     disabilityCards.push({
//                         [disability.id]: fileURL,
//                     });
//                 }
//             }
//         }
//     }
//     return disabilityCards;
// }

// async function getDivyangDetailsIDProofFileURLs(personId: string) {
//     try {
//         const divyangDetails = (await getDivyangDetailsByPersonIdDB(personId)) as {
//             [key: string]: any;
//         };
//         log(
//             "info",
//             "[getDivyangDetailsFileURLs]: divyangDetails: %o",
//             divyangDetails
//         );
//         const imageColumns = [
//             "profilePhotoFile",
//             "voterIdFile",
//             "panCardFile",
//             "drivingLicenseFile",
//             "rationCardFile",
//             "aadharCardFile",
//             "pensionCardFile",
//             "medicalInsuranceCardFile",
//             "disabilitySchemeCardFile",
//             "BPL_OR_APL_CardFile",
//             "UDIDCardFile",
//         ];

//         const columnNameFieldNameMap: Map<string, string> = new Map();

//         columnNameFieldNameMap.set("profilePhotoFile", "profilePhoto");
//         columnNameFieldNameMap.set("voterIdFile", "voterId");
//         columnNameFieldNameMap.set("panCardFile", "panCard");
//         columnNameFieldNameMap.set("drivingLicenseFile", "drivingLicense");
//         columnNameFieldNameMap.set("rationCardFile", "rationCard");
//         columnNameFieldNameMap.set("aadharCardFile", "aadharCard");
//         columnNameFieldNameMap.set("pensionCardFile", "pensionCard");
//         columnNameFieldNameMap.set(
//             "medicalInsuranceCardFile",
//             "medicalInsuranceCard"
//         );
//         columnNameFieldNameMap.set(
//             "disabilitySchemeCardFile",
//             "disabilitySchemeCard"
//         );
//         columnNameFieldNameMap.set("BPL_OR_APL_CardFile", "BPL_OR_APL_Card");
//         columnNameFieldNameMap.set("UDIDCardFile", "UDIDCard");

//         if (divyangDetails) {
//             const files: filesResponse = [];

//             for (const column of imageColumns) {
//                 const field = columnNameFieldNameMap.get(column);
//                 if (field) {
//                     const key = divyangDetails[column];
//                     if (key) {
//                         const fileURL = await generateFileURLResponseFromKey(key);
//                         if (fileURL) {
//                             files.push({
//                                 [field]: fileURL,
//                             });
//                         }
//                     }
//                 }
//             }

//             log("info", "[getDivyangDetailsFileURLs]: files %o", files);
//             return files;
//         }
//     } catch (error) {
//         log("error", "[getDivyangDetailsFileURLs]: %o", error);
//     }
// }

// async function saveDivyangProfilePhotoToS3andDB(
//     personId: string,
//     file: Express.Multer.File
// ) {
//     try {
//         const transaction = prisma.$transaction(async (prisma) => {
//             const key = generateKey(personId, file);
//             const result = await updateDivyangProfileKeyDB(prisma, personId, {
//                 profilePhotoFile: key,
//                 profilePhotoFileName: file.originalname,
//             });
//             log("info", "[saveDivyangProfilePhotoToS3andDB]: result: %o", result);
//             const s3Result = await saveFileBufferToS3(personId, file);
//             if (s3Result) {
//                 return await generateFileURLResponseFromResult(s3Result);
//             }
//         });
//         return transaction;
//     } catch (error) {
//         throw new APIError(
//             "There was an error uploading your files. Please try again.",
//             StatusCodes.INTERNAL_SERVER_ERROR,
//             "FileUploadError",
//             "E"
//         );
//     }
// }

// async function deleteDivyangDetailsProfilePhotoFromS3andDB(personId: string) {
//     try {
//         const transaction = prisma.$transaction(async (prisma) => {
//             const user = await getDivyangDetailsByPersonIdDB(personId);
//             const key = user?.profilePhotoFile;
//             const result = await updateDivyangProfileKeyDB(prisma, personId, {
//                 profilePhotoFile: null,
//                 profilePhotoFileName: null,
//             });
//             log(
//                 "info",
//                 "[deleteDivyangDetailsProfilePhotoFromS3andDB]: result: %o",
//                 result
//             );

//             if (key) {
//                 const s3Result = await deleteFile(key);
//                 if (s3Result) {
//                     return s3Result;
//                 }
//             }
//         });
//         return transaction;
//     } catch (error) {
//         throw new APIError(
//             "There was an error uploading your files. Please try again.",
//             StatusCodes.INTERNAL_SERVER_ERROR,
//             "FileUploadError",
//             "E"
//         );
//     }
// }

// async function deleteUserProfilePhotoFromS3andDB(personId: string) {
//     try {
//         const transaction = prisma.$transaction(async (prisma) => {
//             const user = await getUserByPersonIdDB(personId);
//             const key = user?.profilePhotoFile;
//             const result = await updateUserProfileKeyDB(prisma, personId, {
//                 profilePhotoFile: null,
//                 profilePhotoFileName: null,
//             });
//             log("info", "[deleteUserProfilePhotoFromS3andDB]: result: %o", result);
//             if (key) {
//                 const s3Result = await deleteFile(key);
//                 if (s3Result) {
//                     return s3Result;
//                 }
//             }
//         });
//         return transaction;
//     } catch (error) {
//         throw new APIError(
//             "There was an error uploading your files. Please try again.",
//             StatusCodes.INTERNAL_SERVER_ERROR,
//             "FileUploadError",
//             "E"
//         );
//     }
// }

// async function saveUserProfilePhotoToS3andDB(
//     personId: string,
//     file: Express.Multer.File
// ) {
//     try {
//         const transaction = prisma.$transaction(async (prisma) => {
//             const key = generateKey(personId, file);
//             const result = await updateUserProfileKeyDB(prisma, personId, {
//                 profilePhotoFile: key,
//                 profilePhotoFileName: file.originalname,
//             });
//             log("info", "[saveUserProfilePhotoToS3AndDB]: result: %o", result);
//             const s3Result = await saveFileBufferToS3(personId, file);
//             if (s3Result) {
//                 return await generateFileURLResponseFromResult(s3Result);
//             }
//         });
//         return transaction;
//     } catch (error) {
//         throw new APIError(
//             "There was an error uploading your files. Please try again.",
//             StatusCodes.INTERNAL_SERVER_ERROR,
//             "FileUploadError",
//             "E"
//         );
//     }
// }

// const keyMap: Map<string, string> = new Map();
// keyMap.set("voterId", "voterIdFile");
// keyMap.set("panCard", "panCardFile");
// keyMap.set("rationCard", "rationCardFile");
// keyMap.set("drivingLicense", "drivingLicenseFile");
// keyMap.set("pensionCard", "pensionCardFile");
// keyMap.set("medicalInsuranceCard", "medicalInsuranceCardFile");
// keyMap.set("disabilitySchemeCard", "disabilitySchemeCardFile");
// keyMap.set("aadharCard", "aadharCardFile");
// keyMap.set("BPL_OR_APL_Card", "BPL_OR_APL_CardFile");

// const fileNameMap: Map<string, string> = new Map();
// fileNameMap.set("voterId", "voterIdFileName");
// fileNameMap.set("panCard", "panCardFileName");
// fileNameMap.set("rationCard", "rationCardFileName");
// fileNameMap.set("drivingLicense", "drivingLicenseFileName");
// fileNameMap.set("pensionCard", "pensionCardFileName");
// fileNameMap.set("medicalInsuranceCard", "medicalInsuranceCardFileName");
// fileNameMap.set("disabilitySchemeCard", "disabilitySchemeCardFileName");
// fileNameMap.set("aadharCard", "aadharCardFileName");
// fileNameMap.set("BPL_OR_APL_Card", "BPL_OR_APL_CardFileName");

// function createKeyUpdateData(
//     files: { [fieldName: string]: Express.Multer.File[] },
//     personId: string,
//     idProofUploads: { [column: string]: any } | undefined
// ) {

//     const data: any = {}; // I can"t do this! Cries~ Without using `any` *sobs*
//     log("info", "[createKeyUpdateData]: Keys: %o", keyMap.keys());
//     for (const field of keyMap.keys()) {
//         const key = keyMap.get(field);
//         const fileName = fileNameMap.get(field);
//         if (key && fileName) {
//             if (files[field]) {
//                 const file = files[field][0];
//                 data[key] = generateKey(personId, file);
//                 data[fileName] = file.originalname;
//             } else {
//                 if (idProofUploads) {
//                     if (!idProofUploads[key]) {
//                         data[key] = null;
//                         data[fileName] = null;
//                     }
//                 }
//             }
//         }
//     }

//     return data;
// }

// export type filesResponse = {
//     [field: string]: {
//         key: string;
//         url: string;
//         validUpto: string;
//         expiresInSeconds: number;
//     };
// }[];

// export type disabilityCardsResponse = {
//     [id: string]: {
//         key: string;
//         url: string;
//         validUpto: string;
//         expiresInSeconds: number;
//     };
// }[];

// async function deleteIdProofFilesFromS3(personId: string, files: { [fieldname: string]: Express.Multer.File[] },divyangDetailsRequest: updateDivyangDetailsRequest) {
//     try {
//         const idProofUploads = divyangDetailsRequest.IdProofUploads;

//         const divyangDetails  = await getDivyangDetailsByPersonIdDB(personId) as {[column: string]: any};

//         if (idProofUploads) {
//             for (const fileField of keyMap.keys()) {
//                 // If file does not exist
//                 if (!files[fileField]) {
//                     // check if corresponding key field exists
//                     // (ex: panCardFile, aadharCardFile, etc exist)
//                     const keyField = keyMap.get(fileField);
//                     if (keyField) {
//                         if (!idProofUploads.hasOwnProperty(keyField)) {
//                             // key field (panCardFile) and file field (panCard) both don't exist
//                             // delete from S3
//                             const keyToDelete = divyangDetails[keyField];
//                             if (keyToDelete) {
//                                 await deleteFile(keyToDelete);
//                             }
//                         }
//                     }
//                 }
//             }
//         }
//     } catch (error) {
//         throw new APIError(
//             "There was an error uploading your files. Please try again.",
//             StatusCodes.INTERNAL_SERVER_ERROR,
//             "FileUploadError",
//             "E"
//         );
//     }
// }

// async function saveDivyangDetailsIdProofFilestoS3andDB(
//     personId: string,
//     files: { [fieldname: string]: Express.Multer.File[] },
//     divyangDetails: updateDivyangDetailsRequest
// ): Promise<filesResponse | undefined> {
//     try {

//         const transaction = prisma.$transaction(async (prisma) => {
//             const data = createKeyUpdateData(
//                 files,
//                 personId,
//                 divyangDetails.IdProofUploads
//             );
//             log("info", "[saveDivyangDetailsFilestoS3andDB]: data: %o", data);

//             await deleteIdProofFilesFromS3(personId, files, divyangDetails);

//             const result = await divayangDetailsUpdateFileKeysDB(
//                 prisma,
//                 personId,
//                 data
//             );
//             const s3Result = await saveFileBuffersToS3(personId, files);
//             if (s3Result) {
//                 return await generateFileURLsResponseFromResult(s3Result);
//             }
//         });
//         return transaction;
//     } catch (error) {
//         throw new APIError(
//             "There was an error uploading your files. Please try again.",
//             StatusCodes.INTERNAL_SERVER_ERROR,
//             "FileUploadError",
//             "E"
//         );
//     }
// }

// async function deleteUDIDCardFromS3andDB(personId: string) {
//     try {
//         const transaction = prisma.$transaction(async (prisma) => {
//             const divyang = await getDivyangDetailsByPersonIdDB(personId);
//             if (divyang) {
//                 const key = divyang.UDIDCardFile;
//                 if (divyang?.UDIDCardFile) {
//                     const dbResult = await updateUDIDCardKeyDB(prisma, personId, {
//                         UDIDCardFile: null,
//                         UDIDCardFileName: null,
//                     });
//                     log("info", "[deleteUDIDCardFromS3andDB]: dbResult: %o", dbResult);
//                     if (key) {
//                         const s3Result = await deleteFile(key);
//                         log("info", "[deleteUDIDCardFromS3andDB]: s3Result: %o", s3Result);
//                     }
//                 }
//             }
//         });
//         return transaction;
//     } catch (error) {
//         throwDatabaseError(error);
//     }
// }

// async function saveUDIDCardToS3andDB(
//     personId: string,
//     file: Express.Multer.File
// ) {
//     try {
//         const transaction = prisma.$transaction(async (prisma) => {
//             const key = generateKey(personId, file);
//             const dbResult = await updateUDIDCardKeyDB(prisma, personId, {
//                 UDIDCardFile: key,
//                 UDIDCardFileName: file.originalname,
//             });
//             log("info", "[saveUDIDCardToS3andDB]: dbResult: %o", dbResult);

//             const s3Result = saveFileBufferToS3(personId, file);
//             log("info", "[saveUDIDCardToS3andDB]: s3Result: %o", s3Result);
//         });
//         return transaction;
//     } catch (error) {
//         throwDatabaseError(error);
//     }
// }

// async function updateDivyangDisabilityCardsToS3andDB(
//     divyangDetails: updateDivyangDetailsRequest,
//     files: Express.Multer.File[],
//     personId: string
// ) {
//     try {
//         const transaction = prisma.$transaction(async (prisma) => {

//             const existingDisabilities = await getDivyangDisabilitiesByPersonIdDB(
//                 prisma,
//                 personId
//             );

//             log(
//                 "info",
//                 "[saveDivyangDisabilityDetailsToS3andDB]: existingDisabilities: %o",
//                 existingDisabilities
//             );
//             const disabilities = divyangDetails.disabilityDetails?.disabilities;
//             log(
//                 "info",
//                 "[saveDivyangDisabilityDetailsToS3andDB]: disabilities: %o",
//                 disabilities
//             );
//             if (disabilities) {
//                 for (const disability of disabilities) {
//                     if (existingDisabilities) {
//                         for (const existingDisability of existingDisabilities) {
//                             if (
//                                 disability.disabilityTypeId ===
//                                 existingDisability.disabilityTypeId &&
//                                 (disability.disabilitySubTypeId
//                                     ? disability.disabilitySubTypeId ===
//                                     existingDisability.disabilitySubTypeId
//                                     : true)
//                             ) {
//                                 const requestCardName = disability.disabilityCardFileName;
//                                 log(
//                                     "info",
//                                     "[saveDivyangDisabilityDetailsToS3andDB]: requestCardName: %o",
//                                     requestCardName
//                                 );
//                                 if (requestCardName) {
//                                     for (const file of files) {
//                                         if (requestCardName === file.originalname) {
//                                             const key = generateDisablityCardFileKey(
//                                                 personId,
//                                                 file,
//                                                 existingDisability.id
//                                             );

//                                             if (existingDisability.id) {
//                                                 // save key to db
//                                                 const dbResult = await saveDisabilityDetailsCardKey(
//                                                     prisma,
//                                                     existingDisability.id,
//                                                     {
//                                                         disabilityCardFileName: file.originalname,
//                                                         disabilityCardFile: key,
//                                                     }
//                                                 );
//                                                 const s3Result = await saveDisabilityCardFileBufferToS3(
//                                                     personId,
//                                                     file,
//                                                     existingDisability.id
//                                                 );

//                                                 log(
//                                                     "info",
//                                                     "[saveDivyangDisabilityDetailsToS3andDB]: dbResult: %o",
//                                                     dbResult
//                                                 );
//                                                 log(
//                                                     "info",
//                                                     "[saveDivyangDisabilityDetailsToS3andDB]: s3Result: %o",
//                                                     s3Result
//                                                 );
//                                             }
//                                         }
//                                     }
//                                 } else {
//                                     if (existingDisability.id) {
//                                         const keyToDelete = existingDisability.disabilityCardFile;
//                                         const dbResult = await saveDisabilityDetailsCardKey(
//                                             prisma,
//                                             existingDisability.id,
//                                             {
//                                                 disabilityCardFile: null,
//                                                 disabilityCardFileName: null,
//                                             }
//                                         );
//                                         if (keyToDelete) {
//                                             const s3Result = deleteFile(keyToDelete);
//                                             log(
//                                                 "info",
//                                                 "[saveDivyangDisabilityDetailsToS3andDB]: s3Result: %o",
//                                                 s3Result
//                                             );
//                                         }
//                                         log(
//                                             "info",
//                                             "[saveDivyangDisabilityDetailsToS3andDB]: dbResult: %o",
//                                             dbResult
//                                         );
//                                     }
//                                 }
//                             }
//                         }
//                     }
//                 }
//             }
//         });
//         return transaction;
//     } catch (error) {
//         throw new APIError(
//             "There was an error uploading your files. Please try again.",
//             StatusCodes.INTERNAL_SERVER_ERROR,
//             "FileUploadError",
//             "E"
//         );
//     }
// }

// export {
//     saveUserProfilePhotoToS3andDB,
//     getDivyangDetailsIDProofFileURLs,
//     saveDivyangDetailsIdProofFilestoS3andDB,
//     saveDivyangProfilePhotoToS3andDB,
//     deleteUserProfilePhotoFromS3andDB,
//     deleteDivyangDetailsProfilePhotoFromS3andDB,
//     updateDivyangDisabilityCardsToS3andDB,
//     getDivyangDetailsDisabilityCardsFileURLS,
//     saveUDIDCardToS3andDB,
//     deleteUDIDCardFromS3andDB,
// };
