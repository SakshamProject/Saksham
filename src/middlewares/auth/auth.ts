import { NextFunction, Request, Response } from "express";
import log from "../../services/logger/logger.js";

function authenticate(request: Request, response: Response, next: NextFunction) {
    const user: User = {
        id: "2691d6f9-7660-4f81-afe2-19d20c84f545",
    };
    request.user = user;
    // log("info", "[middleware/auth]:\n %o", user);
    next();
}

export { authenticate };