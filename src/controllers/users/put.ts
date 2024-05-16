import { usersPutSchema } from "../../types/users/usersSchema.js";
import { NextFunction, Response, Request } from "express";
import {createResponseWithFile} from "../../types/createResponseSchema.js";
import updateUserTransactionDB from "../../services/database/users/transaction/update.js";
import {deleteUserProfilePhotoFromS3andDB, saveUserProfilePhotoToS3andDB} from "../../services/files/files.js";
import {getUserByPersonIdDB} from "../../services/database/users/read.js";
import log from "../../services/logger/logger.js";
import {generateFileURLResponseFromKey} from "../../services/s3/s3.js";
async function putUser(request: Request, response: Response, next: NextFunction) {
    try {
        const id = request.params.id;
        const body = usersPutSchema.parse(request.body);
        const result = await updateUserTransactionDB(body,id,request.token?.personId);
        const personId = result?.personId;
        if (personId) {
            if (request.file) {
                // update file
                await saveUserProfilePhotoToS3andDB(personId, request.file);
            } else {
                // delete file
                if (!body.profilePhotoFile && !body.profilePhotoFileName) {
                    log("info", "[controllers/users/put.ts]: Delete File")
                    await deleteUserProfilePhotoFromS3andDB(personId);
                }
            }
            const updatedResult = await getUserByPersonIdDB(personId);
            let file = {};
            if (updatedResult?.profilePhotoFile) {
                file = {
                    "profilePhoto": await generateFileURLResponseFromKey(updatedResult.profilePhotoFile)
                }
            }
            const responseData = createResponseWithFile(updatedResult, file);
            response.json(responseData);
        }

    }
    catch(error) {
        next(error);
    }
}

export { putUser };
