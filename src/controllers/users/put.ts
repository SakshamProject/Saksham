import { usersPutSchema } from "../../types/users/usersSchema.js";
import { NextFunction, Response, Request } from "express";
import {createResponseWithFile} from "../../types/createResponseSchema.js";
import updateUserTransactionDB from "../../services/database/users/transaction/update.js";
import {deleteUserProfilePhotoFromS3andDB, saveUserProfilePhotoToS3andDB} from "../../services/files/files.js";
import {getUserByIdDB, getUserByPersonIdDB} from "../../services/database/users/read.js";
import log from "../../services/logger/logger.js";
async function putUser(request: Request, response: Response, next: NextFunction) {
    try {
        const id = request.params.id;
        const body = usersPutSchema.parse(request.body);
        // const updatedBy = "55bbfe28-5f62-4829-b8ba-7bf8ae6b8187"
        const result = await updateUserTransactionDB(body,id,request.token?.userId);
        const userId = result?.id;
        let file: object | undefined = {}
        const personId = result?.personId;
        if (personId) {
            if (request.file) {
                // update file
                file = await saveUserProfilePhotoToS3andDB(personId, request.file);
            } else {
                // delete file
                log("info", "[controllers/users/put.ts]: Delete File")
                await deleteUserProfilePhotoFromS3andDB(personId);
            }
            const updatedResult = await getUserByPersonIdDB(personId);
            const responseData = createResponseWithFile(updatedResult, file);
            response.json(responseData);
        }

    }
    catch(error) {
        next(error);
    }
}

export { putUser };
