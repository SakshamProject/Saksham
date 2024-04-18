import { updateUserDBObject } from "../../dto/users/put.js";
import { createUserDB } from "../../services/database/users/create.js";
import { updateUserDB } from "../../services/database/users/update.js";
import { usersPutSchema } from "../../types/users/usersSchema.js";
import { NextFunction, Response, Request } from "express";
import { getUsersDBTransaction } from "../../services/database/users/transaction/read.js";
import {listUserWhereInput} from "../../dto/users/post.js";
import {saveFile, saveFiles} from "../../middlewares/fileHandler/fileHandler.js";
import { createResponseOnlyData } from "../../types/createResponseSchema.js";
async function putUser(request: Request, response: Response, next: NextFunction) {
    try {
        const body = usersPutSchema.parse(request.body);
        const userUpdateObject = updateUserDBObject(body);
        const newUser = await updateUserDB(userUpdateObject);
        // TODO createdBy Id
        if (newUser && request.file) {
            saveFile(newUser.id, request.file);
        }
        const responseData = createResponseOnlyData(newUser);
        response.json(responseData);
    }
    catch(error) {
        next(error);
    }
}

export{putUser}