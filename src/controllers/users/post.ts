import {NextFunction, Response, Request} from "express";
import {userListSchema, usersPostSchema, usersPutSchema} from "../../types/users/usersSchema.js";
import log from "../../services/logger/logger.js";
import { createUserDBObject } from "../../dto/users/post.js";
import {createUserDB} from "../../services/database/users/create.js";
import {createResponseOnlyData} from "../../types/createResponseSchema.js";
import { getUsersDBTransaction } from "../../services/database/users/transaction/read.js";
import {listUserWhereInput} from "../../dto/users/post.js";
import {saveFile, saveFiles} from "../../middlewares/fileHandler/fileHandler.js";
import { updateUserDBObject } from "../../dto/users/put.js";


async function postUser(request: Request, response: Response, next: NextFunction) {
    try {
        const body = usersPostSchema.parse(request.body);
        log( "info", `[controller/post]:\n body: %o`, body);
        log("info", `[controller/post]:\n file: %o`, request.file || {});

        const userInputObject = createUserDBObject(request);
        log("info", `[controller/post]:\n userInputObject: %o`, userInputObject);

        const newUser = await createUserDB(userInputObject);
        log("info", `[controller/postUser]:\n newUser: %o`, newUser || {});
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

async function listUser (request: Request, response: Response, next: NextFunction) {
    try {
        const body = userListSchema.parse(request.body);
        log("info", "[controller/listUser]: body: %o", body);
        const userWhereInput = listUserWhereInput(body);
        log("info", "[controller/listUser]: userWhereInput: %o", userWhereInput);
        const result = await getUsersDBTransaction(
            body.pagination?.start,
            body.pagination?.rows,
            body.sorting?.sortOrder,
            body.sorting?.orderByColumn,
            userWhereInput
        );
        log("info", "[controller/listUser]: result: %o", result || {});
        response.json(result);
    } catch (error) {
        next(error);
    }
};


export { postUser, listUser };