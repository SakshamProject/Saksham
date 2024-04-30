import { usersPutSchema } from "../../types/users/usersSchema.js";
import { NextFunction, Response, Request } from "express";
import {createResponseOnlyData, createResponseWithFile} from "../../types/createResponseSchema.js";
import updateUserTransactionDB from "../../services/database/users/transaction/update.js";
import {saveProfilePhotoToS3andDB} from "../../services/files/files.js";
async function putUser(request: Request, response: Response, next: NextFunction) {
    try {
        const id = request.params.id;
        const body = usersPutSchema.parse(request.body);
        // const updatedBy = "55bbfe28-5f62-4829-b8ba-7bf8ae6b8187"
        const result = await updateUserTransactionDB(body,id,request.user.id);

        let file: object | undefined = {}
        const personId = result?.personId;
        if (request.file && personId) {
            file = await saveProfilePhotoToS3andDB(personId, request.file);
        }
        const responseData = createResponseWithFile(result, file);
        response.json(responseData);
    }
    catch(error) {
        next(error);
    }
}

export{putUser}