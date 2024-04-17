import { NextFunction, Request, Response } from "express";
import log from "../../services/logger/logger.js";

function authenticate(request: Request, response: Response, next: NextFunction) {
    const user: User = {
        id: "28818dba-67b8-4a33-8a3a-26d2f171227a",
    };
    request.user = user;
    // log("info", "[middleware/auth]:\n %o", user);
    next();
}

export { authenticate };