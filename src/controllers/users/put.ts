import { updateUserDBObject } from "../../dto/users/put.js";
import { createUserDB } from "../../services/database/users/create.js";
import { updateUserDB } from "../../services/database/users/update.js";
import { usersPutSchema } from "../../types/users/usersSchema.js";
import { NextFunction, Response, Request } from "express";
import { getUsersDBTransaction } from "../../services/database/users/transaction/read.js";
import {listUserWhereInput} from "../../dto/users/post.js";
import {saveFile, saveFiles} from "../../middlewares/fileHandler/fileHandler.js";
import { createResponseOnlyData } from "../../types/createResponseSchema.js";
import updateUserTransactionDB from "../../services/database/users/transaction/update.js";
async function putUser(request: Request, response: Response, next: NextFunction) {
    try {
        const id = request.params.id;
        const body = usersPutSchema.parse(request.body);
        const updatedBy = ""
        const result = updateUserTransactionDB(body,id,updatedBy)
        const responseData = createResponseOnlyData(result);
        response.json(responseData);
    }
    catch(error) {
        next(error);
    }
}

export{putUser}