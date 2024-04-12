import { NextFunction, Request, Response } from "express";
import log from "../../services/logger/logger.js";

function authenticate(request: Request, response: Response, next: NextFunction) {
    const user: User = {
        id: "dd427476-140e-46d1-a9ba-d962e6455f4d",
    };
    request.user = user;
    log("info", "[middleware/auth]:\n %o", user);
    next();
}

export { authenticate };