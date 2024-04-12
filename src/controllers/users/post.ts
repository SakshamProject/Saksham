import {NextFunction, Response, Request} from "express";
import {userListSchema, usersPostSchema} from "../../types/users/usersSchema.js";
import log from "../../services/logger/logger.js";
import { createUserDBObject } from "../../dto/users/post.js";
import {createUserDB} from "../../services/database/users/create.js";
import {createResponseOnlyData} from "../../types/createResponseSchema.js";

async function postUser(request: Request, response: Response, next: NextFunction) {
    try {
        const body = usersPostSchema.parse(request.body);
        log( "info", `[controller/post]:\n body: %o`, body);
        log("info", `[controller/post]:\n file: %o`, request.file || {});

        const userInputObject = createUserDBObject(body);
        log("info", `[controller/post]:\n userInputObject: %o`, userInputObject);

        const newUser = await createUserDB(userInputObject);
        log("info", `[controller/postUser]:\n newUser: %o`, newUser || {});
        // TODO createdBy Id

        const responseData = createResponseOnlyData(newUser);
        response.json(responseData);
    }
    catch(error) {
        next(error);
    }
}

import { getUsersDBTransaction } from "../../services/database/users/transaction/read.js";
import {listUserWhereInput} from "../../dto/users/post.js";

const listUser = async (
    request: Request,
    response: Response,
    next: NextFunction
) => {
    try {
        console.log("sending get req");
        const body = userListSchema.parse(request.body);
        const userWhereInput = listUserWhereInput(body);
        const result = await getUsersDBTransaction(
            body.pagination?.start,
            body.pagination?.rows,
            body.sorting?.sortOrder,
            body.sorting?.orderByColumn,
            userWhereInput
        );
        response.json(result);
    } catch (error) {
        next(error);
    }
};


export { postUser, listUser };