import { usersPutSchema } from "../../types/users/usersSchema.js";
import { NextFunction, Response, Request } from "express";
import { createResponseOnlyData } from "../../types/createResponseSchema.js";
import updateUserTransactionDB from "../../services/database/users/transaction/update.js";
import { handleProfilePhotoFile } from "../../services/files/profilePhoto.js";
async function putUser(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const id = request.params.id;
    const body = usersPutSchema.parse(request.body);
    const result = await updateUserTransactionDB(
      body,
      id,
      request.token?.personId
    );
    await handleProfilePhotoFile(request, true);
    const responseData = createResponseOnlyData(result);
    // const personId = result?.personId;
    // if (personId) {
    //     if (request.file) {
    //         // update file
    //     await saveUserProfilePhotoToS3andDB(personId, request.file);
    //     } else {
    //         // delete file
    //         if (!body.profilePhotoFile) {
    //             log("info", "[controllers/users/put.ts]: Delete File")
    //             await deleteUserProfilePhotoFromS3andDB(personId);
    //         }
    //     }
    //     const updatedResult = await getUserByPersonIdDB(personId);
    //     let file = {};
    //     if (updatedResult?.profilePhotoFile) {
    //         file = {
    //             "profilePhoto": await generateFileURLResponseFromKey(updatedResult.profilePhotoFile)
    //         }
    //     }
    //     const responseData = createResponseWithFile(updatedResult, file);
    //     response.json(responseData);
    // }
  } catch (error) {
    next(error);
  }
}

export { putUser };
