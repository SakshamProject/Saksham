import {NextFunction, Response, Request} from "express";
import {userListSchema, usersPostSchema, usersPutSchema} from "../../types/users/usersSchema.js";
import log from "../../services/logger/logger.js";
import { createPersonDBObject } from "../../dto/users/post.js";
import {createPersonDB} from "../../services/database/users/create.js";
import {
    createResponseForFilter,
    createResponseWithFile
} from "../../types/createResponseSchema.js";
import { getUsersDBTransaction } from "../../services/database/users/transaction/read.js";
import {listUserWhereInput} from "../../dto/users/post.js";
import {saveProfilePhotoToS3andDB} from "../../services/files/files.js";


async function postUser(request: Request, response: Response, next: NextFunction) {
    try {
        const body = usersPostSchema.parse(request.body);
        log( "info", `[controller/post]:\n body: %o`, body);
        log("info", `[controller/post]:\n file: %o`, request.file || {});

        const userInputObject = createPersonDBObject(request);
        log("info", `[controller/post]:\n userInputObject: %o`, userInputObject);

        const newPerson = await createPersonDB(userInputObject);
        log("info", `[controller/postUser]:\n newUser: %o`, newPerson || {});

        let file: object | undefined = {};
        const personId = newPerson?.id;
        if (personId && request.file) {
            file = await saveProfilePhotoToS3andDB(personId, request.file);
        }

        const responseData = createResponseWithFile(newPerson, file);
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

        const responseData = createResponseForFilter(
            result?.users,
            body,
            result?.total,
            (result?.users?.length)
        );
        response.json(responseData);
    } catch (error) {
        next(error);
    }
};


export { postUser, listUser };