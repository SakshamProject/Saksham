import {NextFunction, Response, Request} from "express";
import {usersPostSchema} from "../../types/users/usersSchema.js";
import log from "../../services/logger/logger.js";

async function postUser(request: Request, response: Response, next: NextFunction) {
    try {
        const body = usersPostSchema.parse(request.body);
        log( "info", `[controller/post]:\n body: %o`, body);
        log("info", `[controller/post]:\n file: %o`, request.file || {});
        response.json({message: "Under Construction!"});
    }
    catch(error) {
        next(error);
    }
}

export { postUser };