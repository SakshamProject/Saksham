import {NextFunction, Response, Request} from "express";
import {usersPostSchema} from "../../types/user/usersSchema.js";
import logger from "../../services/logger/logger.js";

async function postUser(request: Request, response: Response, next: NextFunction) {
    try {
        const body = usersPostSchema.parse(request.body);
        logger.log({level: "info", message: `body: ${JSON.stringify(body)}`});
        response.json({message: "Under Construction!"});
    }
    catch(error) {
        next(error);
    }
}

export { postUser };