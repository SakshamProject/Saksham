import { NextFunction, Request, Response } from "express";
import log from "../../services/logger/logger.js";

function authenticate(request: Request, response: Response, next: NextFunction) {
    const user: User = {
        id: "d62ea177-8fef-44d5-8776-807a8399a8db", // User Id
    };
    request.user = user;
    // log("info", "[middleware/auth]:\n %o", user);
    next();
}

export { authenticate };